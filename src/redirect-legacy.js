export default {
  fetch(request) {
    const target = new URL(request.url);
    target.protocol = 'https:';
    target.hostname = 'perelioy.com';
    target.port = '';
    return Response.redirect(target.href, 301);
  },
};
