"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = require("mongoose");
var cors_1 = __importDefault(require("cors"));
var user_model_1 = require("./user.model");
var path_1 = __importDefault(require("path"));
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        this.connectDB = function () { return __awaiter(_this, void 0, void 0, function () {
            var uriDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uriDB = process.env.MONGO_URI || "";
                        return [4 /*yield*/, (0, mongoose_1.connect)(uriDB, {}, function (err) {
                                if (err) {
                                    console.log("Error Connecting to the Database", err);
                                }
                                else {
                                    console.log("Connect to the database");
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 3000;
        this.connectDB();
        this.cors();
        this.routes();
        this.Model = user_model_1.User;
    }
    Server.prototype.routes = function () {
        var _this = this;
        this.app.post("/api", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var User;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        User = new this.Model(req.body);
                        return [4 /*yield*/, User.save()];
                    case 1:
                        _a.sent();
                        res.status(200).send({ msg: "ok" });
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.get("/api", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Model.find()];
                    case 1:
                        results = _a.sent();
                        res.status(200).send({ results: results });
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.put("/api/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        return [4 /*yield*/, this.Model.findByIdAndUpdate(req.params.id, req.body)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.delete('/api/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Model.findByIdAndDelete(req.params.id)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ msg: "ok" });
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.use('*', function (req, res) {
            res.sendFile(path_1.default.resolve("public/index.html"));
        });
    };
    Server.prototype.cors = function () {
        this.app.use(express_1.default.static("public"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded());
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server listening on ".concat(_this.port));
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map