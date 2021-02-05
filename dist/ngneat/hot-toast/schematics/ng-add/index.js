"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = void 0;
/* eslint-disable prefer-arrow/prefer-arrow-functions */
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_1 = require("./utils");
const project_targets_1 = require("./utils/project-targets");
const ng_module_imports_1 = require("./utils/ng-module-imports");
const importModuleSet = [
    {
        moduleName: 'HotToastModule',
        importModuleStatement: 'HotToastModule.forRoot()',
        importPath: '@ngneat/hot-toast',
    },
];
function ngAdd(options) {
    return (tree) => {
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new schematics_1.SchematicsException('Could not find Angular workspace configuration');
        }
        return schematics_1.chain([
            addPackageJsonDependencies(),
            installPackageJsonDependencies(),
            injectImports(options),
            addModuleToImports(options),
        ]);
    };
}
exports.ngAdd = ngAdd;
function addPackageJsonDependencies() {
    return (host, context) => {
        const dependencies = [{ name: '@ngneat/overview', version: '^1.0.0' }];
        dependencies.forEach((dependency) => {
            utils_1.addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
            context.logger.log('info', `✅️ Added "${dependency.name}`);
        });
        return host;
    };
}
function installPackageJsonDependencies() {
    return (host, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);
        return host;
    };
}
function injectImports(options) {
    return (host, context) => {
        if (!options.skipImport) {
            const workspace = utils_1.getWorkspace(host);
            const project = utils_1.getProjectFromWorkspace(workspace, options.project ? options.project : Object.keys(workspace.projects)[0]);
            if (!project || project.projectType !== 'application') {
                throw new schematics_1.SchematicsException(`A client project type of "application" is required.`);
            }
            if (!project.architect ||
                !project.architect.build ||
                !project.architect.build.options ||
                !project.architect.build.options.main) {
                throw project_targets_1.targetBuildNotFoundError();
            }
            const modulePath = ng_ast_utils_1.getAppModulePath(host, project.architect.build.options.main);
            const moduleSource = utils_1.getSourceFile(host, modulePath);
            importModuleSet.forEach((item) => {
                if (ast_utils_1.isImported(moduleSource, item.moduleName, item.importPath)) {
                    context.logger.warn(`Could not import "${item.moduleName}" because it's already imported.`);
                }
                else {
                    const change = ast_utils_1.insertImport(moduleSource, modulePath, item.moduleName, item.importPath);
                    if (change) {
                        const recorder = host.beginUpdate(modulePath);
                        recorder.insertLeft(change.pos, change.toAdd);
                        host.commitUpdate(recorder);
                        context.logger.log('info', '✅ Written import statement for "' + item.moduleName + '"');
                    }
                }
            });
            return host;
        }
    };
}
function addModuleToImports(options) {
    return (host, context) => {
        if (!options.skipImport) {
            const workspace = utils_1.getWorkspace(host);
            const project = utils_1.getProjectFromWorkspace(workspace, options.project ? options.project : Object.keys(workspace.projects)[0]);
            if (!project || project.projectType !== 'application') {
                throw new schematics_1.SchematicsException(`A client project type of "application" is required.`);
            }
            if (!project.architect) {
                throw new schematics_1.SchematicsException(`Architect options not present for project.`);
            }
            if (!project.architect.build) {
                throw new schematics_1.SchematicsException(`Architect:Build options not present for project.`);
            }
            const modulePath = ng_ast_utils_1.getAppModulePath(host, project.architect.build.options.main);
            importModuleSet.forEach((item) => {
                if (ng_module_imports_1.hasNgModuleImport(host, modulePath, item.moduleName)) {
                    context.logger.warn(`Could not set up "${item.moduleName}" in "imports[]" because it's already imported.`);
                }
                else {
                    utils_1.addModuleImportToRootModule(host, item.importModuleStatement, null, project);
                    context.logger.log('info', '✅ Imported "' + item.moduleName + '" in imports');
                }
            });
        }
        return host;
    };
}
//# sourceMappingURL=index.js.map