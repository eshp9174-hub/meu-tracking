export default async function handler(req, res) {

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
  const ua = req.headers['user-agent'];

  const body = req.body || {};

  await fetch("https://graph.facebook.com/v18.0/1603357864325666/events?access_token=EAAZAPMV0ZCjGIBRMxdr9YaFqDpZByWNdRmkX9iF3ZB9E8xnTRN6cQjPZAP5m8LCYAoc2eaMk8LxpdlQrlhZCEIRdQ4RSb211E4RaDXCM0LZBewSw48PfOhoT5PYoZAs036KUsHG5L87rWT4dDbWnf9jOZCqRVPnwlmDzTP1jY73RUklTHYNRcdjJXlMsOZBZBpv3QZDZD", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [{
        event_name: "PageView",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: "pv_" + Date.now(),

        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          fbp: body.fbp || "",
          fbc: body.fbc || ""
        }
      }]
    })
  });

  res.status(200).json({ ok: true });
}
