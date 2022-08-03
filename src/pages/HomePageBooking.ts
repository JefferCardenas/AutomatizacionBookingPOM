import { Page } from "@playwright/test";

export class HomePageBooking{

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async fillForm(data){

        let TXT_ARRIVAL = this.page.locator("xpath=//input[@id = 'ss']");
        let BTN_SEARCH = this.page.locator("xpath=//button[@data-sb-id= 'main']")

        await TXT_ARRIVAL.fill(data.arrival);
        await this.setDate(data.dateCheckin, data.dateCheckout);
        await this.setPeopleAndRooms(data.adults, data.children, data.rooms);
        await BTN_SEARCH.click();
    
    }

    async setDate(dateCheckin:string, dateCheckout:string){

        let BTN_DATE = this.page.locator("xpath=//div[@class = 'xp__dates-inner']");
        let BTN_NEXT = this.page.locator("xpath=//div[@data-bui-ref = 'calendar-next']");
        let LBL_MONTH  = this.page.locator("xpath=(//div[@class = 'bui-calendar__wrapper'])[1]//div[@class = 'bui-calendar__month']");

        /**Separamos el String, para sacar las fechas
         * "31-agosto 2022" --> ["31", "agosto 2022"]
         */
        let checkin = dateCheckin.split("-");
        let checkout = dateCheckout.split("-");

        /**
         * Damos una espera a que la pagina cargue bien
         */
        await this.page.waitForTimeout(500);
        await BTN_DATE.click()

        /**
         * Avanzamos en el calendario hasta que encontremos el mes que necesitamos
         * luego seleccionamos el dia
         */
        while(await LBL_MONTH.innerText() != checkin[1]){
        
            await BTN_NEXT.click();
        }

        await this.page.locator(`xpath=(//div[@class = 'bui-calendar__wrapper'])[1]//ancestor-or-self::div[@class = 'bui-calendar__wrapper']//td[@class = 'bui-calendar__date']//span[text() = '${checkin[0]}']`).click();

        while(await LBL_MONTH.innerText() != checkout[1]){
        
            await BTN_NEXT.click();
        }

        await this.page.locator(`xpath=(//div[@class = 'bui-calendar__wrapper'])[1]//ancestor-or-self::div[@class = 'bui-calendar__wrapper']//td[@class = 'bui-calendar__date']//span[text() = '${checkout[0]}']`).click();

    }

    async setPeopleAndRooms(adult:number, children:number, rooms:number){

        let BTN_GUEST_COUNT = this.page.locator("xpath=//span[@class = 'xp__guests__count']");
        let BTN_ADD_ADULTS = this.page.locator("xpath=//div[@class = 'sb-group__field sb-group__field-adults']//button[@data-bui-ref = 'input-stepper-add-button']");
        let BTN_ADD_CHILD = this.page.locator("xpath=//div[@class = 'sb-group__field sb-group-children ']//button[@data-bui-ref = 'input-stepper-add-button']");
        let BTN_ADD_ROOM = this.page.locator("xpath=//div[@class = 'sb-group__field sb-group__field-rooms']//button[@data-bui-ref = 'input-stepper-add-button']");

        await BTN_GUEST_COUNT.click();

        for(let a = 1; a <= adult - 2; a++){
            await BTN_ADD_ADULTS.click();
        }

        for(let a = 0; a < children; a++){
            await BTN_ADD_CHILD.click();
        }

        for(let a = 1; a <= (rooms - 1); a++){
            await BTN_ADD_ROOM.click();
        }
    }
}