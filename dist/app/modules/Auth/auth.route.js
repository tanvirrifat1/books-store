"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.create), auth_controller_1.AuthController.insertIntoDb);
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signIn), auth_controller_1.AuthController.signIn);
exports.AuthRoutes = router;
