"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const index_1 = require("./database/index");
app_1.app.set('port', process.env.PORT || 3000);
const port = app_1.app.get('port');
if (process.env.NODE_ENV === 'development' || 'production') {
    index_1.connectDB();
}
app_1.app.listen(port, () => console.log(`Server listening on port ${port}!`));
//# sourceMappingURL=server.js.map