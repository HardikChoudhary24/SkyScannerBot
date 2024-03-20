# Sky Scanner Bot

Sky Scanner Bot is a Discord bot designed to help users track the cheapest flight rates between specified departure and arrival locations on Sky Scanner. The bot allows users to input their desired departure and arrival locations, along with dates, and sets up a tracker to monitor the fluctuating prices. It scans the Sky Scanner website every 8 minutes and generates a response if the price is lower than the previously generated response, providing a link to the corresponding Sky Scanner page for easy access.

## Features

- **Flight Tracking:** Set up trackers to monitor flight prices between specified locations and dates.
- **Automatic Scanning:** The bot scans the Sky Scanner website every 8 minutes to keep track of price changes.
- **Real-time Updates:** Receive real-time notifications and updates when a cheaper flight rate is found.
- **Link Generation:** Get direct links to the corresponding Sky Scanner pages for quick access to booking.

## Usage

1. Invite the Sky Scanner Bot to your Discord server.
2. Use the `\start_tracking` command followed by the departure location, arrival location, and dates in the format `\start_tracking <departure> <arrival> <date-yymmdd>`.
   Example: `\start_tracking Delhi Lucknow 240331`
3. The bot will start tracking the flight prices and will notify you if a cheaper rate is found.
4. Receive a response with a link to the Sky Scanner page for the cheaper flight option.

## Commands

- `\start_tracking <departure> <arrival> <date-yymmdd>` - Start tracking flight prices between specified locations on specified date.
- `\get_price` - Display the price of the flight for which the tracker was initiated.

## Getting Started

To get started with the Sky Scanner Bot, simply invite it to your Discord server and start using the `\start_tracking` command to set up flight price trackers. Stay updated with real-time notifications and find the best deals on flights hassle-free!

## Disclaimer

Sky Scanner Bot is a third-party application and is not affiliated with Sky Scanner. It relies on public APIs and web scraping techniques to provide flight price tracking functionality. Prices and availability may vary based on external factors.
