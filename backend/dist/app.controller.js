"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const links_service_1 = require("./links/links.service");
let AppController = class AppController {
    appService;
    linksService;
    constructor(appService, linksService) {
        this.appService = appService;
        this.linksService = linksService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async redirect(shortCode, res) {
        const link = await this.linksService.findByShortCode(shortCode);
        if (!link) {
            throw new common_1.NotFoundException('Short link not found');
        }
        if (!link.isActive) {
            throw new common_1.NotFoundException('Short link is inactive');
        }
        if (link.expiresAt && new Date() > link.expiresAt) {
            throw new common_1.NotFoundException('Short link has expired');
        }
        return res.redirect(common_1.HttpStatus.MOVED_PERMANENTLY, link.originalUrl);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('s/:shortCode'),
    __param(0, (0, common_1.Param)('shortCode')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "redirect", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        links_service_1.LinksService])
], AppController);
//# sourceMappingURL=app.controller.js.map