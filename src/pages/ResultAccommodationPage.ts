import {expect, Page} from "@playwright/test";

export class ResultAccommodation{

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async isInResultPage(){
        await expect(this.page.locator("xpath=//h1[contains(text(), 'alojamientos encontrados')]")).toBeVisible();
    }

    async filterByFantastic(){
        await this.page.locator("xpath=//div[@class = 'ffa9856b86 c9c3c66a7d f7d4209a37']//div[text() = 'Fantástico: 9 o más']").click();
    
    }

    async setCurrency(currency:string){
        
        let BTN_CURRENCY = this.page.locator("xpath=//button[@data-tooltip-text = 'Elegir tu moneda']");
        
        await BTN_CURRENCY.click();

        await this.page.waitForTimeout(1100);

        await this.page.locator(`xpath=//div[@class = 'bui-overlay bui-overlay--active']//li//a[@data-modal-header-async-url-param = 'changed_currency=1&selected_currency=${currency}']`).click();

    }

    async getCheapAccommodation(){

        /**
         * Obtenemos el precio de los alojamientos que estan a no mas de 500 m de la playa
         */
        let pricesString = await this.page.locator("xpath=(//span[contains(text(),' 50 m') or contains(text(),'100 m')or contains(text(),'150 m')or contains(text(),'200 m')or contains(text(),'250 m')or contains(text(),'300 m')or contains(text(),'350 m')or contains(text(),'400 m')or contains(text(),'450 m')or contains(text(),'500 m')])/ancestor-or-self::div[@class='d20f4628d0']//span[@class = 'fcab3ed991 bd73d13072']").allInnerTexts();

        const priceClean = pricesString.map((price) => {
            return price.replace('COP ', '');
        });

        console.log("****HOTELES MAS CERCANOS A LA PLAYA****");
        for(let item of priceClean){
            console.log("HOTEL --> " + item);
        }
    }
}