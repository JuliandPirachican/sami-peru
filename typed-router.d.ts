/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '$error': RouteRecordInfo<'$error', '/:error(.*)', { error: ParamValue<true> }, { error: ParamValue<false> }>,
    'administracion-cambio-contrasena': RouteRecordInfo<'administracion-cambio-contrasena', '/administracion/cambio-contrasena', Record<never, never>, Record<never, never>>,
    'administracion-log-usuario': RouteRecordInfo<'administracion-log-usuario', '/administracion/log-usuario', Record<never, never>, Record<never, never>>,
    'administracion-permiso-zonal': RouteRecordInfo<'administracion-permiso-zonal', '/administracion/permiso-zonal', Record<never, never>, Record<never, never>>,
    'consultas-generales': RouteRecordInfo<'consultas-generales', '/consultas/generales', Record<never, never>, Record<never, never>>,
    'consultas-log-pedido': RouteRecordInfo<'consultas-log-pedido', '/consultas/log-pedido', Record<never, never>, Record<never, never>>,
    'consultas-saldo-cartera': RouteRecordInfo<'consultas-saldo-cartera', '/consultas/saldo-cartera', Record<never, never>, Record<never, never>>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    'main': RouteRecordInfo<'main', '/main', Record<never, never>, Record<never, never>>,
    'no-autorizado': RouteRecordInfo<'no-autorizado', '/no-autorizado', Record<never, never>, Record<never, never>>,
    'procesos-abrir-asistencia': RouteRecordInfo<'procesos-abrir-asistencia', '/procesos/abrir-asistencia', Record<never, never>, Record<never, never>>,
    'procesos-actualizar-dato': RouteRecordInfo<'procesos-actualizar-dato', '/procesos/actualizar-dato', Record<never, never>, Record<never, never>>,
    'procesos-aprob-ingr-digitales': RouteRecordInfo<'procesos-aprob-ingr-digitales', '/procesos/aprob-ingr-digitales', Record<never, never>, Record<never, never>>,
    'procesos-cerrar-asistencia': RouteRecordInfo<'procesos-cerrar-asistencia', '/procesos/cerrar-asistencia', Record<never, never>, Record<never, never>>,
    'procesos-confirmar-inscripcion': RouteRecordInfo<'procesos-confirmar-inscripcion', '/procesos/confirmar-inscripcion', Record<never, never>, Record<never, never>>,
    'procesos-consolidado-campana': RouteRecordInfo<'procesos-consolidado-campana', '/procesos/consolidado-campana', Record<never, never>, Record<never, never>>,
    'procesos-desbloquear-asesora': RouteRecordInfo<'procesos-desbloquear-asesora', '/procesos/desbloquear-asesora', Record<never, never>, Record<never, never>>,
    'procesos-gestionar-posible-asesora': RouteRecordInfo<'procesos-gestionar-posible-asesora', '/procesos/gestionar-posible-asesora', Record<never, never>, Record<never, never>>,
    'procesos-gestionar-vacaciones': RouteRecordInfo<'procesos-gestionar-vacaciones', '/procesos/gestionar-vacaciones', Record<never, never>, Record<never, never>>,
    'procesos-grabar-pedido': RouteRecordInfo<'procesos-grabar-pedido', '/procesos/grabar-pedido', Record<never, never>, Record<never, never>>,
    'procesos-posible-asesora': RouteRecordInfo<'procesos-posible-asesora', '/procesos/posible-asesora', Record<never, never>, Record<never, never>>,
    'procesos-producto-zona': RouteRecordInfo<'procesos-producto-zona', '/procesos/producto-zona', Record<never, never>, Record<never, never>>,
    'procesos-respuesta-incidencias': RouteRecordInfo<'procesos-respuesta-incidencias', '/procesos/respuesta-incidencias', Record<never, never>, Record<never, never>>,
    'procesos-solicitar-recodificacion': RouteRecordInfo<'procesos-solicitar-recodificacion', '/procesos/solicitar-recodificacion', Record<never, never>, Record<never, never>>,
    'procesos-solicitar-vacaciones': RouteRecordInfo<'procesos-solicitar-vacaciones', '/procesos/solicitar-vacaciones', Record<never, never>, Record<never, never>>,
    'procesos-vinculacion-digital': RouteRecordInfo<'procesos-vinculacion-digital', '/procesos/vinculacion-digital', Record<never, never>, Record<never, never>>,
    'prueba': RouteRecordInfo<'prueba', '/prueba', Record<never, never>, Record<never, never>>,
    'pruebas-prueba': RouteRecordInfo<'pruebas-prueba', '/pruebas/prueba', Record<never, never>, Record<never, never>>,
    'reportes-asistencia-conferencia': RouteRecordInfo<'reportes-asistencia-conferencia', '/reportes/asistencia-conferencia', Record<never, never>, Record<never, never>>,
    'reportes-ciclo-pedido': RouteRecordInfo<'reportes-ciclo-pedido', '/reportes/ciclo-pedido', Record<never, never>, Record<never, never>>,
    'reportes-comportamiento-cambios': RouteRecordInfo<'reportes-comportamiento-cambios', '/reportes/comportamiento-cambios', Record<never, never>, Record<never, never>>,
    'reportes-consecutividad': RouteRecordInfo<'reportes-consecutividad', '/reportes/consecutividad', Record<never, never>, Record<never, never>>,
    'reportes-directorio-lider': RouteRecordInfo<'reportes-directorio-lider', '/reportes/directorio-lider', Record<never, never>, Record<never, never>>,
    'reportes-distribucion-consolidado-estado-pedido': RouteRecordInfo<'reportes-distribucion-consolidado-estado-pedido', '/reportes/distribucion/consolidado-estado-pedido', Record<never, never>, Record<never, never>>,
    'reportes-distribucion-estado-pedido-fecha': RouteRecordInfo<'reportes-distribucion-estado-pedido-fecha', '/reportes/distribucion/estado-pedido-fecha', Record<never, never>, Record<never, never>>,
    'reportes-evaluacion-cierre': RouteRecordInfo<'reportes-evaluacion-cierre', '/reportes/evaluacion-cierre', Record<never, never>, Record<never, never>>,
    'reportes-fraccionamiento': RouteRecordInfo<'reportes-fraccionamiento', '/reportes/fraccionamiento', Record<never, never>, Record<never, never>>,
    'reportes-gemmas-acumuladas': RouteRecordInfo<'reportes-gemmas-acumuladas', '/reportes/gemmas-acumuladas', Record<never, never>, Record<never, never>>,
    'reportes-inscripciones': RouteRecordInfo<'reportes-inscripciones', '/reportes/inscripciones', Record<never, never>, Record<never, never>>,
    'reportes-lider-pago': RouteRecordInfo<'reportes-lider-pago', '/reportes/lider-pago', Record<never, never>, Record<never, never>>,
    'reportes-listado-asesora': RouteRecordInfo<'reportes-listado-asesora', '/reportes/listado-asesora', Record<never, never>, Record<never, never>>,
    'reportes-pedido-digitado-pais': RouteRecordInfo<'reportes-pedido-digitado-pais', '/reportes/pedido-digitado-pais', Record<never, never>, Record<never, never>>,
    'reportes-pedido-digitado-region': RouteRecordInfo<'reportes-pedido-digitado-region', '/reportes/pedido-digitado-region', Record<never, never>, Record<never, never>>,
    'reportes-pedido-digitado-zona': RouteRecordInfo<'reportes-pedido-digitado-zona', '/reportes/pedido-digitado-zona', Record<never, never>, Record<never, never>>,
    'reportes-posibles-asesoras': RouteRecordInfo<'reportes-posibles-asesoras', '/reportes/posibles-asesoras', Record<never, never>, Record<never, never>>,
    'reportes-prepedido': RouteRecordInfo<'reportes-prepedido', '/reportes/prepedido', Record<never, never>, Record<never, never>>,
    'reportes-producto-lider': RouteRecordInfo<'reportes-producto-lider', '/reportes/producto-lider', Record<never, never>, Record<never, never>>,
    'reportes-proyeccion-region': RouteRecordInfo<'reportes-proyeccion-region', '/reportes/proyeccion-region', Record<never, never>, Record<never, never>>,
    'reportes-proyeccion-zona': RouteRecordInfo<'reportes-proyeccion-zona', '/reportes/proyeccion-zona', Record<never, never>, Record<never, never>>,
    'reportes-referidos': RouteRecordInfo<'reportes-referidos', '/reportes/referidos', Record<never, never>, Record<never, never>>,
    'reportes-segmentacion-asesora': RouteRecordInfo<'reportes-segmentacion-asesora', '/reportes/segmentacion-asesora', Record<never, never>, Record<never, never>>,
    'reportes-seguimiento-cierre-pais': RouteRecordInfo<'reportes-seguimiento-cierre-pais', '/reportes/seguimiento-cierre-pais', Record<never, never>, Record<never, never>>,
    'reportes-seguimiento-cierre-region': RouteRecordInfo<'reportes-seguimiento-cierre-region', '/reportes/seguimiento-cierre-region', Record<never, never>, Record<never, never>>,
    'reportes-seguimiento-cierre-zona': RouteRecordInfo<'reportes-seguimiento-cierre-zona', '/reportes/seguimiento-cierre-zona', Record<never, never>, Record<never, never>>,
    'reportes-semaforo-lider': RouteRecordInfo<'reportes-semaforo-lider', '/reportes/semaforo-lider', Record<never, never>, Record<never, never>>,
    'reportes-semaforo-zona': RouteRecordInfo<'reportes-semaforo-zona', '/reportes/semaforo-zona', Record<never, never>, Record<never, never>>,
    'reportes-simulador-cobranza': RouteRecordInfo<'reportes-simulador-cobranza', '/reportes/simulador-cobranza', Record<never, never>, Record<never, never>>,
    'reportes-status-mgz': RouteRecordInfo<'reportes-status-mgz', '/reportes/status-mgz', Record<never, never>, Record<never, never>>,
    'reportes-tracking-zona': RouteRecordInfo<'reportes-tracking-zona', '/reportes/tracking-zona', Record<never, never>, Record<never, never>>,
    'reportes-vacaciones-consolidado': RouteRecordInfo<'reportes-vacaciones-consolidado', '/reportes/vacaciones-consolidado', Record<never, never>, Record<never, never>>,
    'reportes-vacaciones-pendientes': RouteRecordInfo<'reportes-vacaciones-pendientes', '/reportes/vacaciones-pendientes', Record<never, never>, Record<never, never>>,
    'reportes-vinculacion-digital': RouteRecordInfo<'reportes-vinculacion-digital', '/reportes/vinculacion-digital', Record<never, never>, Record<never, never>>,
    'reportes-visitas': RouteRecordInfo<'reportes-visitas', '/reportes/visitas', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
