const rcsdk = require('./lib/rc-sdk')
const logger = require('./lib/logger')
const Subscriptions = require('@ringcentral/subscriptions').Subscriptions;
const { parseExcelSheet, writeExcelSheet } = require('./lib/sheets')

rcsdk
    .platform()
    .login({
        username: process.env.RINGCENTRAL_USERNAME,
        extension: process.env.RINGCENTRAL_EXTENSION,
        password: process.env.RINGCENTRAL_PASSWORD
    })
    .then(() => {
        // kick off the application. all other logic is handled from main()
        main()
    })
    .catch(e => {
        logger.error("Issue logging in: ", e)
    })

const subscriptions = new Subscriptions({
    sdk: rcsdk
});


async function main() {
    let excelData = await parseExcelSheet('./Example\ Sheet.xlsx')
        .catch(e => {
            logger.error(e)
        })

    logger.info(excelData)

    // reference: https://developers.ringcentral.com/api-reference/Company/readAccountInfo
    rcsdk
        .platform()
        .get(`/restapi/v1.0/account/~`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            logger.info(res)
        })
        .catch(e => {
            logger.error("Issue logging in: ", e)
        })

    // reference: https://developers.ringcentral.com/api-reference/SMS/createSMSMessage
    rcsdk
        .platform()
        .post('/restapi/v1.0/account/~/extension/~/sms', {
            from: {
                phoneNumber: 'Your-RC-Number'
            },
            to: [{
                phoneNumber: 'Recipient-Phone-Number'
            },],
            text: "Here's the outbound!"
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            logger.info(res)
        })
        .catch(e => {
            logger.error(e)
        })

    var subscription = subscriptions.createSubscription({
        pollInterval: 100
    });

    // if you send an SMS after this is created, you will see the inbound message and body
    subscription.on(subscription.events.notification, function (msg) {
        logger.info(msg.body)
    });

    // reference: https://developers.ringcentral.com/api-reference/Instant-Message-Event
    subscription
        .setEventFilters(['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']) // a list of server-side events
        .register()

}