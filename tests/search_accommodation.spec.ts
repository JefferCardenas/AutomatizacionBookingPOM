import {test} from '@playwright/test';
import { HomePageBooking } from '../src/pages/HomePageBooking';
import { ResultAccommodation } from '../src/pages/ResultAccommodationPage';

/**datos para hacer el login */
const data = {
    arrival : 'San Andrés, Colombia',
    dateCheckin : '31-agosto 2022',
    dateCheckout : '4-septiembre 2022',
    adults: 2,
    children: 0,
    rooms: 2
}

const currency = 'COP';

/******************************** */

test.beforeEach(async ({page})=>{

    page.goto('https://www.booking.com/index.es.html');

});

test(`
Given I am on the main booking page
When looking for accommodation
Then I see the available accommodations
`, async ({page})=>{

    const homePageBooking = new HomePageBooking(page);
    const resultAccommodation = new ResultAccommodation(page);

    await homePageBooking.fillForm(data);

    await resultAccommodation.isInResultPage();

    await resultAccommodation.filterByFantastic();

    await resultAccommodation.isInResultPage();

    await resultAccommodation.setCurrency(currency);

    await resultAccommodation.isInResultPage();

    await resultAccommodation.getCheapAccommodation();


})