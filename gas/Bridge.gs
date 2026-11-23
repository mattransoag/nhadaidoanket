/**
 * NDK BRIDGE – GitHub Pages -> Apps Script -> Sheets/Drive
 * Copy into an existing Apps Script project as Bridge.gs, then redeploy Web App.
 * The HtmlService iframe may be nested by Google; send replies to window.top.
 * The ping action does not access sensitive data.
 * Keep existing Code.gs / authRpc / v332Login / v332Logout unchanged.
 * WARNING: internal password/session implementation in existing project is a PILOT.
 * Do not use with real citizens' records before security review and permission testing.
 */
const NDK_BRIDGE_ORIGIN = 'https://mattransoag.github.io';
const NDK_BRIDGE_MAX_PAYLOAD = 9000000;
function doPost(e) {
  var req = null;
  try {
    if (!e || !e.parameter || typeof e.parameter.payload !== 'string') throw new Error('Thiếu nội dung yêu cầu.');
    var raw = e.parameter.payload;
    if (raw.length > NDK_BRIDGE_MAX_PAYLOAD) throw new Error('Yêu cầu vượt giới hạn.');
    req = JSON.parse(raw);
    if (!req || !/^[a-zA-Z0-9_-]{12,90}$/.test(String(req.id || ''))) throw new Error('Mã yêu cầu không hợp lệ.');
    var action = String(req.action || '');
    var result;
    if (action === 'ping') {
      result = {status: 'ok', service: 'NDK_GAS_BRIDGE', version: 2};
    } else if (action === 'login') {
      result = v332Login(req.username, req.password);
    } else if (action === 'logout') {
      result = v332Logout(req.token);
    } else if (action === 'rpc') {
      if (!Array.isArray(req.args) || req.args.length > 5) throw new Error('Tham số không hợp lệ.');
      result = authRpc(req.method, req.args, req.token);
    } else if (action === 'settings') {
      result = v34PublicUiSettings();
    } else if (action === 'logo') {
      result = v341PublicLogo();
    } else {
      throw new Error('Thao tác không được hỗ trợ.');
    }
    return ndkBridgeReply_({ndkBridge: true, id: req.id, ok: true, result: result});
  } catch (err) {
    return ndkBridgeReply_({
      ndkBridge: true,
      id: req && /^[a-zA-Z0-9_-]{12,90}$/.test(String(req.id || '')) ? req.id : '',
      ok: false,
      error: String(err && err.message || err)
    });
  }
}
function ndkBridgeReply_(packet) {
  // Only the authorized GitHub origin may receive the result (via window.postMessage).
  // Escape HTML-script delimiters and JS line separators.
  var json = JSON.stringify(packet)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  var html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.top.postMessage(' + json + ',' + JSON.stringify(NDK_BRIDGE_ORIGIN) + ');<\/script>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
