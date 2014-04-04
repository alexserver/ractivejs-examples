var connect     = require('connect'),
    app         = null,

    config  = {
      port        : 3030
    };

app = connect();
app
    .use(connect.static('public/'))
    .listen(config.port);


