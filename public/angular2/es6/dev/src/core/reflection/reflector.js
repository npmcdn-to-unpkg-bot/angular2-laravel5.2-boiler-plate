import { isPresent } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Map, MapWrapper, Set, SetWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export class ReflectionInfo {
    constructor(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector {
    constructor(reflectionCapabilities) {
        /** @internal */
        this._injectableInfo = new Map();
        /** @internal */
        this._getters = new Map();
        /** @internal */
        this._setters = new Map();
        /** @internal */
        this._methods = new Map();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    isReflectionEnabled() { return this.reflectionCapabilities.isReflectionEnabled(); }
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage() { this._usedKeys = new Set(); }
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys() {
        if (this._usedKeys == null) {
            throw new BaseException('Usage tracking is disabled');
        }
        var allTypes = MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(key => !SetWrapper.has(this._usedKeys, key));
    }
    registerFunction(func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    }
    registerType(type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    }
    registerGetters(getters) { _mergeMaps(this._getters, getters); }
    registerSetters(setters) { _mergeMaps(this._setters, setters); }
    registerMethods(methods) { _mergeMaps(this._methods, methods); }
    factory(type) {
        if (this._containsReflectionInfo(type)) {
            var res = this._getReflectionInfo(type).factory;
            return isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    }
    parameters(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).parameters;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    }
    annotations(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).annotations;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    }
    propMetadata(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    }
    interfaces(type) {
        if (this._injectableInfo.has(type)) {
            var res = this._getReflectionInfo(type).interfaces;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    }
    getter(name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    }
    setter(name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    }
    method(name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    }
    /** @internal */
    _getReflectionInfo(typeOrFunc) {
        if (isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    }
    /** @internal */
    _containsReflectionInfo(typeOrFunc) { return this._injectableInfo.has(typeOrFunc); }
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
}
function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, (v, k) => target.set(k, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOlsiUmVmbGVjdGlvbkluZm8iLCJSZWZsZWN0aW9uSW5mby5jb25zdHJ1Y3RvciIsIlJlZmxlY3RvciIsIlJlZmxlY3Rvci5jb25zdHJ1Y3RvciIsIlJlZmxlY3Rvci5pc1JlZmxlY3Rpb25FbmFibGVkIiwiUmVmbGVjdG9yLnRyYWNrVXNhZ2UiLCJSZWZsZWN0b3IubGlzdFVudXNlZEtleXMiLCJSZWZsZWN0b3IucmVnaXN0ZXJGdW5jdGlvbiIsIlJlZmxlY3Rvci5yZWdpc3RlclR5cGUiLCJSZWZsZWN0b3IucmVnaXN0ZXJHZXR0ZXJzIiwiUmVmbGVjdG9yLnJlZ2lzdGVyU2V0dGVycyIsIlJlZmxlY3Rvci5yZWdpc3Rlck1ldGhvZHMiLCJSZWZsZWN0b3IuZmFjdG9yeSIsIlJlZmxlY3Rvci5wYXJhbWV0ZXJzIiwiUmVmbGVjdG9yLmFubm90YXRpb25zIiwiUmVmbGVjdG9yLnByb3BNZXRhZGF0YSIsIlJlZmxlY3Rvci5pbnRlcmZhY2VzIiwiUmVmbGVjdG9yLmdldHRlciIsIlJlZmxlY3Rvci5zZXR0ZXIiLCJSZWZsZWN0b3IubWV0aG9kIiwiUmVmbGVjdG9yLl9nZXRSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5fY29udGFpbnNSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5pbXBvcnRVcmkiLCJfbWVyZ2VNYXBzIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFPLFNBQVMsRUFBWSxNQUFNLDBCQUEwQjtPQUM1RCxFQUFDLGFBQWEsRUFBbUIsTUFBTSxnQ0FBZ0M7T0FDdkUsRUFFTCxHQUFHLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2pCLE1BQU0sZ0NBQWdDO0FBTXZDOztHQUVHO0FBQ0g7SUFDRUEsWUFBbUJBLFdBQW1CQSxFQUFTQSxVQUFvQkEsRUFB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QUFDakZBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBNYXAsXG4gIE1hcFdyYXBwZXIsXG4gIFNldCxcbiAgU2V0V3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtTZXR0ZXJGbiwgR2V0dGVyRm4sIE1ldGhvZEZufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7UGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuL3BsYXRmb3JtX3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmV4cG9ydCB7U2V0dGVyRm4sIEdldHRlckZuLCBNZXRob2RGbn0gZnJvbSAnLi90eXBlcyc7XG5leHBvcnQge1BsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9wbGF0Zm9ybV9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5cbi8qKlxuICogUmVmbGVjdGl2ZSBpbmZvcm1hdGlvbiBhYm91dCBhIHN5bWJvbCwgaW5jbHVkaW5nIGFubm90YXRpb25zLCBpbnRlcmZhY2VzLCBhbmQgb3RoZXIgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aW9uSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhbm5vdGF0aW9ucz86IGFueVtdLCBwdWJsaWMgcGFyYW1ldGVycz86IGFueVtdW10sIHB1YmxpYyBmYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnRlcmZhY2VzPzogYW55W10sIHB1YmxpYyBwcm9wTWV0YWRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55W119KSB7fVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byByZWZsZWN0aW9uIGRhdGEgYWJvdXQgc3ltYm9scy4gVXNlZCBpbnRlcm5hbGx5IGJ5IEFuZ3VsYXJcbiAqIHRvIHBvd2VyIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGFuZCBjb21waWxhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmxlY3RvciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luamVjdGFibGVJbmZvID0gbmV3IE1hcDxhbnksIFJlZmxlY3Rpb25JbmZvPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9nZXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIEdldHRlckZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIFNldHRlckZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9tZXRob2RzID0gbmV3IE1hcDxzdHJpbmcsIE1ldGhvZEZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF91c2VkS2V5czogU2V0PGFueT47XG4gIHJlZmxlY3Rpb25DYXBhYmlsaXRpZXM6IFBsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllcztcblxuICBjb25zdHJ1Y3RvcihyZWZsZWN0aW9uQ2FwYWJpbGl0aWVzOiBQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXMpIHtcbiAgICB0aGlzLl91c2VkS2V5cyA9IG51bGw7XG4gICAgdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcztcbiAgfVxuXG4gIGlzUmVmbGVjdGlvbkVuYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaXNSZWZsZWN0aW9uRW5hYmxlZCgpOyB9XG5cbiAgLyoqXG4gICAqIENhdXNlcyBgdGhpc2AgcmVmbGVjdG9yIHRvIHRyYWNrIGtleXMgdXNlZCB0byBhY2Nlc3NcbiAgICoge0BsaW5rIFJlZmxlY3Rpb25JbmZvfSBvYmplY3RzLlxuICAgKi9cbiAgdHJhY2tVc2FnZSgpOiB2b2lkIHsgdGhpcy5fdXNlZEtleXMgPSBuZXcgU2V0KCk7IH1cblxuICAvKipcbiAgICogTGlzdHMgdHlwZXMgZm9yIHdoaWNoIHJlZmxlY3Rpb24gaW5mb3JtYXRpb24gd2FzIG5vdCByZXF1ZXN0ZWQgc2luY2VcbiAgICoge0BsaW5rICN0cmFja1VzYWdlfSB3YXMgY2FsbGVkLiBUaGlzIGxpc3QgY291bGQgbGF0ZXIgYmUgYXVkaXRlZCBhc1xuICAgKiBwb3RlbnRpYWwgZGVhZCBjb2RlLlxuICAgKi9cbiAgbGlzdFVudXNlZEtleXMoKTogYW55W10ge1xuICAgIGlmICh0aGlzLl91c2VkS2V5cyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignVXNhZ2UgdHJhY2tpbmcgaXMgZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgdmFyIGFsbFR5cGVzID0gTWFwV3JhcHBlci5rZXlzKHRoaXMuX2luamVjdGFibGVJbmZvKTtcbiAgICByZXR1cm4gYWxsVHlwZXMuZmlsdGVyKGtleSA9PiAhU2V0V3JhcHBlci5oYXModGhpcy5fdXNlZEtleXMsIGtleSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJGdW5jdGlvbihmdW5jOiBGdW5jdGlvbiwgZnVuY0luZm86IFJlZmxlY3Rpb25JbmZvKTogdm9pZCB7XG4gICAgdGhpcy5faW5qZWN0YWJsZUluZm8uc2V0KGZ1bmMsIGZ1bmNJbmZvKTtcbiAgfVxuXG4gIHJlZ2lzdGVyVHlwZSh0eXBlOiBUeXBlLCB0eXBlSW5mbzogUmVmbGVjdGlvbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLl9pbmplY3RhYmxlSW5mby5zZXQodHlwZSwgdHlwZUluZm8pO1xuICB9XG5cbiAgcmVnaXN0ZXJHZXR0ZXJzKGdldHRlcnM6IHtba2V5OiBzdHJpbmddOiBHZXR0ZXJGbn0pOiB2b2lkIHsgX21lcmdlTWFwcyh0aGlzLl9nZXR0ZXJzLCBnZXR0ZXJzKTsgfVxuXG4gIHJlZ2lzdGVyU2V0dGVycyhzZXR0ZXJzOiB7W2tleTogc3RyaW5nXTogU2V0dGVyRm59KTogdm9pZCB7IF9tZXJnZU1hcHModGhpcy5fc2V0dGVycywgc2V0dGVycyk7IH1cblxuICByZWdpc3Rlck1ldGhvZHMobWV0aG9kczoge1trZXk6IHN0cmluZ106IE1ldGhvZEZufSk6IHZvaWQgeyBfbWVyZ2VNYXBzKHRoaXMuX21ldGhvZHMsIG1ldGhvZHMpOyB9XG5cbiAgZmFjdG9yeSh0eXBlOiBUeXBlKTogRnVuY3Rpb24ge1xuICAgIGlmICh0aGlzLl9jb250YWluc1JlZmxlY3Rpb25JbmZvKHR5cGUpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZSkuZmFjdG9yeTtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuZmFjdG9yeSh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBwYXJhbWV0ZXJzKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IGFueVtdW10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5wYXJhbWV0ZXJzO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBhbm5vdGF0aW9ucyh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLmFubm90YXRpb25zO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuYW5ub3RhdGlvbnModHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgcHJvcE1ldGFkYXRhKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IHtba2V5OiBzdHJpbmddOiBhbnlbXX0ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5wcm9wTWV0YWRhdGE7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wcm9wTWV0YWRhdGEodHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgaW50ZXJmYWNlcyh0eXBlOiBUeXBlKTogYW55W10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZSkpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlKS5pbnRlcmZhY2VzO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaW50ZXJmYWNlcyh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBnZXR0ZXIobmFtZTogc3RyaW5nKTogR2V0dGVyRm4ge1xuICAgIGlmICh0aGlzLl9nZXR0ZXJzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldHRlcnMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmdldHRlcihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZXR0ZXIobmFtZTogc3RyaW5nKTogU2V0dGVyRm4ge1xuICAgIGlmICh0aGlzLl9zZXR0ZXJzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldHRlcnMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnNldHRlcihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBtZXRob2QobmFtZTogc3RyaW5nKTogTWV0aG9kRm4ge1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLm1ldGhvZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jOiBhbnkpOiBSZWZsZWN0aW9uSW5mbyB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl91c2VkS2V5cykpIHtcbiAgICAgIHRoaXMuX3VzZWRLZXlzLmFkZCh0eXBlT3JGdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2luamVjdGFibGVJbmZvLmdldCh0eXBlT3JGdW5jKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRhaW5zUmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYzogYW55KSB7IHJldHVybiB0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYyk7IH1cblxuICBpbXBvcnRVcmkodHlwZTogVHlwZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaW1wb3J0VXJpKHR5cGUpOyB9XG59XG5cbmZ1bmN0aW9uIF9tZXJnZU1hcHModGFyZ2V0OiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4sIGNvbmZpZzoge1trZXk6IHN0cmluZ106IEZ1bmN0aW9ufSk6IHZvaWQge1xuICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goY29uZmlnLCAodjogRnVuY3Rpb24sIGs6IHN0cmluZykgPT4gdGFyZ2V0LnNldChrLCB2KSk7XG59XG4iXX0=