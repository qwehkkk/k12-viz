(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-viz]').forEach(function (el) {
      var cfg;
      try { cfg = JSON.parse(el.getAttribute('data-viz')); }
      catch (e) { console.error('viz config error', e); return; }
      if (cfg.type === 'plot') VIZ.renderPlot(el, cfg);
      else if (cfg.type === 'parabola-lab') VIZ.parabolaLab(el, cfg);
      else if (cfg.type === 'steps') VIZ.stepLab(el, cfg);
      else if (cfg.type === 'bridge') VIZ.bridgeLab(el, cfg);
      else if (cfg.type === 'profit') VIZ.profitLab(el, cfg);
      else if (cfg.type === 'fence') VIZ.fenceLab(el, cfg);
      else if (cfg.type === 'fountain') VIZ.fountainLab(el, cfg);
      else if (cfg.type === 'shot') VIZ.shotLab(el, cfg);
      else if (cfg.type === 'complete-square') VIZ.completeSquareLab(el, cfg);
      else if (cfg.type === 'equation') VIZ.equationLab(el, cfg);
      else if (cfg.type === 'growth') VIZ.growthLab(el, cfg);
      else if (cfg.type === 'rotate') VIZ.rotateLab(el, cfg);
      else if (cfg.type === 'coord-rot') VIZ.coordRotLab(el, cfg);
      else if (cfg.type === 'pattern') VIZ.patternLab(el, cfg);
      else if (cfg.type === 'clock') VIZ.clockLab(el, cfg);
      else if (cfg.type === 'anatomy') VIZ.anatomyLab(el, cfg);
      else if (cfg.type === 'chord') VIZ.chordLab(el, cfg);
      else if (cfg.type === 'inscribed') VIZ.inscribedLab(el, cfg);
      else if (cfg.type === 'position') VIZ.positionLab(el, cfg);
      else if (cfg.type === 'tangent') VIZ.tangentLab(el, cfg);
      else if (cfg.type === 'sector') VIZ.sectorLab(el, cfg);
      else if (cfg.type === 'event-scale') VIZ.eventScaleLab(el, cfg);
      else if (cfg.type === 'bag') VIZ.bagLab(el, cfg);
      else if (cfg.type === 'sum-table') VIZ.sumTableLab(el, cfg);
      else if (cfg.type === 'tree') VIZ.treeLab(el, cfg);
      else if (cfg.type === 'coin') VIZ.coinLab(el, cfg);
      else if (cfg.type === 'dart') VIZ.dartLab(el, cfg);
      else if (cfg.type === 'inverse') VIZ.inverseLab(el, cfg);
      else if (cfg.type === 'k-area') VIZ.kAreaLab(el, cfg);
      else if (cfg.type === 'inverse-cross') VIZ.inverseCrossLab(el, cfg);
      else if (cfg.type === 'inverse-use') VIZ.inverseUseLab(el, cfg);
      else if (cfg.type === 'trig-ratio') VIZ.trigRatioLab(el, cfg);
      else if (cfg.type === 'trig-special') VIZ.trigSpecialLab(el, cfg);
      else if (cfg.type === 'trig-solve') VIZ.trigSolveLab(el, cfg);
      else if (cfg.type === 'trig-height') VIZ.trigHeightLab(el, cfg);
      else if (cfg.type === 'trig-slope') VIZ.trigSlopeLab(el, cfg);
      else if (cfg.type === 'trig-altitude') VIZ.trigAltitudeLab(el, cfg);
      else if (cfg.type === 'sim-golden') VIZ.simGoldenLab(el, cfg);
      else if (cfg.type === 'sim-parallel') VIZ.simParallelLab(el, cfg);
      else if (cfg.type === 'sim-judge') VIZ.simJudgeLab(el, cfg);
      else if (cfg.type === 'sim-area') VIZ.simAreaLab(el, cfg);
      else if (cfg.type === 'sim-nested') VIZ.simNestedLab(el, cfg);
      else if (cfg.type === 'sim-homothety') VIZ.simHomothetyLab(el, cfg);
      else if (cfg.type === 'sim-shadow') VIZ.simShadowLab(el, cfg);
      else if (cfg.type === 'proj-shadow') VIZ.projShadowLab(el, cfg);
      else if (cfg.type === 'proj-orth') VIZ.projOrthLab(el, cfg);
      else if (cfg.type === 'view-three') VIZ.viewThreeLab(el, cfg);
      else if (cfg.type === 'view-blocks') VIZ.viewBlocksLab(el, cfg);
      else if (cfg.type === 'view-solid') VIZ.viewSolidLab(el, cfg);
      else if (cfg.type === 'pythag-squares') VIZ.pythagSquaresLab(el, cfg);
      else if (cfg.type === 'pythag-puzzle') VIZ.pythagPuzzleLab(el, cfg);
      else if (cfg.type === 'pythag-solve') VIZ.pythagSolveLab(el, cfg);
      else if (cfg.type === 'pythag-inverse') VIZ.pythagInverseLab(el, cfg);
      else if (cfg.type === 'pythag-ladder') VIZ.pythagLadderLab(el, cfg);
      else if (cfg.type === 'linear') VIZ.linearLab(el, cfg);
      else if (cfg.type === 'linear-quad') VIZ.linearQuadLab(el, cfg);
      else if (cfg.type === 'linear-cross') VIZ.linearCrossLab(el, cfg);
      else if (cfg.type === 'linear-model') VIZ.linearModelLab(el, cfg);
      else if (cfg.type === 'linear-translate') VIZ.linearTranslateLab(el, cfg);
      else if (cfg.type === 'linear-fit') VIZ.linearFitLab(el, cfg);
      else if (cfg.type === 'pg-prop') VIZ.pgPropLab(el, cfg);
      else if (cfg.type === 'pg-diag') VIZ.pgDiagLab(el, cfg);
      else if (cfg.type === 'pg-judge') VIZ.pgJudgeLab(el, cfg);
      else if (cfg.type === 'pg-midline') VIZ.pgMidlineLab(el, cfg);
      else if (cfg.type === 'pg-rect') VIZ.pgRectLab(el, cfg);
      else if (cfg.type === 'pg-rhombus') VIZ.pgRhombusLab(el, cfg);
      else if (cfg.type === 'pg-square') VIZ.pgSquareLab(el, cfg);
      else if (cfg.type === 'pg-area') VIZ.pgAreaLab(el, cfg);
      else if (cfg.type === 'tri-sides') VIZ.triSidesLab(el, cfg);
      else if (cfg.type === 'tri-lines') VIZ.triLinesLab(el, cfg);
      else if (cfg.type === 'tri-angle') VIZ.triAngleLab(el, cfg);
      else if (cfg.type === 'tri-exterior') VIZ.triExteriorLab(el, cfg);
      else if (cfg.type === 'poly-angle') VIZ.polyAngleLab(el, cfg);
      else if (cfg.type === 'cong-map') VIZ.congMapLab(el, cfg);
      else if (cfg.type === 'cong-judge') VIZ.congJudgeLab(el, cfg);
      else if (cfg.type === 'cong-ssa') VIZ.congSsaLab(el, cfg);
      else if (cfg.type === 'bisector') VIZ.bisectorLab(el, cfg);
      else if (cfg.type === 'ax-fold') VIZ.axFoldLab(el, cfg);
      else if (cfg.type === 'ax-bisector') VIZ.axBisectorLab(el, cfg);
      else if (cfg.type === 'ax-coord') VIZ.axCoordLab(el, cfg);
      else if (cfg.type === 'ax-draw') VIZ.axDrawLab(el, cfg);
      else if (cfg.type === 'ax-isosceles') VIZ.axIsoscelesLab(el, cfg);
      else if (cfg.type === 'ax-iso-judge') VIZ.axIsoJudgeLab(el, cfg);
      else if (cfg.type === 'ax-equi') VIZ.axEquiLab(el, cfg);
      else if (cfg.type === 'ax-path') VIZ.axPathLab(el, cfg);
      else if (cfg.type === 'sqrt-def') VIZ.sqrtDefLab(el, cfg);
      else if (cfg.type === 'sqrt-prop') VIZ.sqrtPropLab(el, cfg);
      else if (cfg.type === 'sqrt-mul') VIZ.sqrtMulLab(el, cfg);
      else if (cfg.type === 'sqrt-div') VIZ.sqrtDivLab(el, cfg);
      else if (cfg.type === 'sqrt-add') VIZ.sqrtAddLab(el, cfg);
      else if (cfg.type === 'sqrt-est') VIZ.sqrtEstLab(el, cfg);
      else if (cfg.type === 'stat-mean') VIZ.statMeanLab(el, cfg);
      else if (cfg.type === 'stat-median') VIZ.statMedianLab(el, cfg);
      else if (cfg.type === 'stat-mode') VIZ.statModeLab(el, cfg);
      else if (cfg.type === 'stat-var') VIZ.statVarLab(el, cfg);
      else if (cfg.type === 'stat-choice') VIZ.statChoiceLab(el, cfg);
      else if (cfg.type === 'rat-line') VIZ.ratLineLab(el, cfg);
      else if (cfg.type === 'rat-abs') VIZ.ratAbsLab(el, cfg);
      else if (cfg.type === 'rat-add') VIZ.ratAddLab(el, cfg);
      else if (cfg.type === 'rat-mul') VIZ.ratMulLab(el, cfg);
      else if (cfg.type === 'rat-power') VIZ.ratPowerLab(el, cfg);
      else if (cfg.type === 'eq-balance') VIZ.eqBalanceLab(el, cfg);
      else if (cfg.type === 'eq-steps') VIZ.eqStepsLab(el, cfg);
      else if (cfg.type === 'eq-motion') VIZ.eqMotionLab(el, cfg);
      else if (cfg.type === 'eq-distro') VIZ.eqDistroLab(el, cfg);
      else if (cfg.type === 'eq-pct') VIZ.eqPctLab(el, cfg);
      else if (cfg.type === 'geo-solids') VIZ.geoSolidsLab(el, cfg);
      else if (cfg.type === 'geo-motion') VIZ.geoMotionLab(el, cfg);
      else if (cfg.type === 'geo-view3') VIZ.geoView3Lab(el, cfg);
      else if (cfg.type === 'geo-seg') VIZ.geoSegLab(el, cfg);
      else if (cfg.type === 'geo-mid') VIZ.geoMidLab(el, cfg);
      else if (cfg.type === 'geo-angle') VIZ.geoAngleLab(el, cfg);
      else if (cfg.type === 'geo-comp') VIZ.geoCompLab(el, cfg);
      else if (cfg.type === 'sys-def') VIZ.sysDefLab(el, cfg);
      else if (cfg.type === 'sys-subst') VIZ.sysSubstLab(el, cfg);
      else if (cfg.type === 'sys-elim') VIZ.sysElimLab(el, cfg);
      else if (cfg.type === 'sys-sol') VIZ.sysSolLab(el, cfg);
      else if (cfg.type === 'sys-case') VIZ.sysCaseLab(el, cfg);
      else if (cfg.type === 'sys-farm') VIZ.sysFarmLab(el, cfg);
      else if (cfg.type === 'ineq-def') VIZ.ineqDefLab(el, cfg);
      else if (cfg.type === 'ineq-flip') VIZ.ineqFlipLab(el, cfg);
      else if (cfg.type === 'ineq-solve') VIZ.ineqSolveLab(el, cfg);
      else if (cfg.type === 'ineq-set') VIZ.ineqSetLab(el, cfg);
      else if (cfg.type === 'ineq-apply') VIZ.ineqApplyLab(el, cfg);
      else if (cfg.type === 'ia-term') VIZ.iaTermLab(el, cfg);
      else if (cfg.type === 'ia-like') VIZ.iaLikeLab(el, cfg);
      else if (cfg.type === 'ia-merge') VIZ.iaMergeLab(el, cfg);
      else if (cfg.type === 'ia-paren') VIZ.iaParenLab(el, cfg);
      else if (cfg.type === 'ia-eval') VIZ.iaEvalLab(el, cfg);
      else if (cfg.type === 'fr-def') VIZ.frDefLab(el, cfg);
      else if (cfg.type === 'fr-simplify') VIZ.frSimplifyLab(el, cfg);
      else if (cfg.type === 'fr-muldiv') VIZ.frMuldivLab(el, cfg);
      else if (cfg.type === 'fr-add') VIZ.frAddLab(el, cfg);
      else if (cfg.type === 'fr-eq') VIZ.frEqLab(el, cfg);
      else if (cfg.type === 'pv-arrow') VIZ.pvArrowLab(el, cfg);
      else if (cfg.type === 'pv-add') VIZ.pvAddLab(el, cfg);
      else if (cfg.type === 'pv-coord') VIZ.pvCoordLab(el, cfg);
      else if (cfg.type === 'pv-dot') VIZ.pvDotLab(el, cfg);
      else if (cfg.type === 'pv-sine') VIZ.pvSineLab(el, cfg);
      else if (cfg.type === 'pv-cosine') VIZ.pvCosineLab(el, cfg);
      else if (cfg.type === 'cx-class') VIZ.cxClassLab(el, cfg);
      else if (cfg.type === 'cx-equal') VIZ.cxEqualLab(el, cfg);
      else if (cfg.type === 'cx-op') VIZ.cxOpLab(el, cfg);
      else if (cfg.type === 'cx-plane') VIZ.cxPlaneLab(el, cfg);
      else if (cfg.type === 'cx-quad') VIZ.cxQuadLab(el, cfg);
      else if (cfg.type === 'sg-solid') VIZ.sgSolidLab(el, cfg);
      else if (cfg.type === 'sg-net') VIZ.sgNetLab(el, cfg);
      else if (cfg.type === 'sg-volume') VIZ.sgVolumeLab(el, cfg);
      else if (cfg.type === 'sg-lines') VIZ.sgLinesLab(el, cfg);
      else if (cfg.type === 'sg-angle') VIZ.sgAngleLab(el, cfg);
      else if (cfg.type === 'sh-sample') VIZ.shSampleLab(el, cfg);
      else if (cfg.type === 'sh-hist') VIZ.shHistLab(el, cfg);
      else if (cfg.type === 'sh-central') VIZ.shCentralLab(el, cfg);
      else if (cfg.type === 'sh-spread') VIZ.shSpreadLab(el, cfg);
      else if (cfg.type === 'sh-corr') VIZ.shCorrLab(el, cfg);
      else if (cfg.type === 'ph-dice') VIZ.phDiceLab(el, cfg);
      else if (cfg.type === 'ph-add') VIZ.phAddLab(el, cfg);
      else if (cfg.type === 'ph-indep') VIZ.phIndepLab(el, cfg);
      else if (cfg.type === 'ph-freq') VIZ.phFreqLab(el, cfg);
      else if (cfg.type === 'st-def') VIZ.stDefLab(el, cfg);
      else if (cfg.type === 'st-rep') VIZ.stRepLab(el, cfg);
      else if (cfg.type === 'st-subset') VIZ.stSubsetLab(el, cfg);
      else if (cfg.type === 'st-venn') VIZ.stVennLab(el, cfg);
      else if (cfg.type === 'st-imply') VIZ.stImplyLab(el, cfg);
      else if (cfg.type === 'qt-vertex') VIZ.qtVertexLab(el, cfg);
      else if (cfg.type === 'qt-trio') VIZ.qtTrioLab(el, cfg);
      else if (cfg.type === 'qt-solve') VIZ.qtSolveLab(el, cfg);
      else if (cfg.type === 'qt-amgm') VIZ.qtAmgmLab(el, cfg);
      else if (cfg.type === 'qt-apply') VIZ.qtApplyLab(el, cfg);
      else if (cfg.type === 'fc-def') VIZ.fcDefLab(el, cfg);
      else if (cfg.type === 'fc-domain') VIZ.fcDomainLab(el, cfg);
      else if (cfg.type === 'fc-piece') VIZ.fcPieceLab(el, cfg);
      else if (cfg.type === 'fc-mono') VIZ.fcMonoLab(el, cfg);
      else if (cfg.type === 'fc-parity') VIZ.fcParityLab(el, cfg);
      else if (cfg.type === 'fc-power') VIZ.fcPowerLab(el, cfg);
      else if (cfg.type === 'el-root') VIZ.elRootLab(el, cfg);
      else if (cfg.type === 'el-exp') VIZ.elExpLab(el, cfg);
      else if (cfg.type === 'el-log') VIZ.elLogLab(el, cfg);
      else if (cfg.type === 'el-logop') VIZ.elLogopLab(el, cfg);
      else if (cfg.type === 'el-half') VIZ.elHalfLab(el, cfg);
      else if (cfg.type === 'tf-radian') VIZ.tfRadianLab(el, cfg);
      else if (cfg.type === 'tf-unit') VIZ.tfUnitLab(el, cfg);
      else if (cfg.type === 'tf-induce') VIZ.tfInduceLab(el, cfg);
      else if (cfg.type === 'tf-graph') VIZ.tfGraphLab(el, cfg);
      else if (cfg.type === 'tf-shm') VIZ.tfShmLab(el, cfg);
      else if (cfg.type === 'rn-sqrt') VIZ.rnSqrtLab(el, cfg);
      else if (cfg.type === 'rn-cube') VIZ.rnCubeLab(el, cfg);
      else if (cfg.type === 'rn-axis') VIZ.rnAxisLab(el, cfg);
      else if (cfg.type === 'rn-est') VIZ.rnEstLab(el, cfg);
      else if (cfg.type === 'rn-class') VIZ.rnClassLab(el, cfg);
      else if (cfg.type === 'pm-power') VIZ.pmPowerLab(el, cfg);
      else if (cfg.type === 'pm-distro') VIZ.pmDistroLab(el, cfg);
      else if (cfg.type === 'pm-sqdiff') VIZ.pmSqdiffLab(el, cfg);
      else if (cfg.type === 'pm-perfect') VIZ.pmPerfectLab(el, cfg);
      else if (cfg.type === 'pm-common') VIZ.pmCommonLab(el, cfg);
      else if (cfg.type === 'pm-xtile') VIZ.pmXtileLab(el, cfg);
      else if (cfg.type === 'dc-sample') VIZ.dcSampleLab(el, cfg);
      else if (cfg.type === 'dc-chart') VIZ.dcChartLab(el, cfg);
      else if (cfg.type === 'dc-pie') VIZ.dcPieLab(el, cfg);
      else if (cfg.type === 'dc-hist') VIZ.dcHistLab(el, cfg);
      else if (cfg.type === 'dc-trunc') VIZ.dcTruncLab(el, cfg);
      else if (cfg.type === 'sv-space') VIZ.svSpaceLab(el, cfg);
      else if (cfg.type === 'sv-dot') VIZ.svDotLab(el, cfg);
      else if (cfg.type === 'sv-normal') VIZ.svNormalLab(el, cfg);
      else if (cfg.type === 'sv-angle') VIZ.svAngleLab(el, cfg);
      else if (cfg.type === 'sv-dist') VIZ.svDistLab(el, cfg);
      else if (cfg.type === 'lc-slope') VIZ.lcSlopeLab(el, cfg);
      else if (cfg.type === 'lc-eq') VIZ.lcEqLab(el, cfg);
      else if (cfg.type === 'lc-pos') VIZ.lcPosLab(el, cfg);
      else if (cfg.type === 'lc-circle') VIZ.lcCircleLab(el, cfg);
      else if (cfg.type === 'lc-cpos') VIZ.lcCposLab(el, cfg);
      else if (cfg.type === 'cn-ellipse') VIZ.cnEllipseLab(el, cfg);
      else if (cfg.type === 'cn-eprop') VIZ.cnEpropLab(el, cfg);
      else if (cfg.type === 'cn-hyperbola') VIZ.cnHyperbolaLab(el, cfg);
      else if (cfg.type === 'cn-parabola') VIZ.cnParabolaLab(el, cfg);
      else if (cfg.type === 'cn-line') VIZ.cnLineLab(el, cfg);
      else if (cfg.type === 'sq-concept') VIZ.sqConceptLab(el, cfg);
      else if (cfg.type === 'sq-arith') VIZ.sqArithLab(el, cfg);
      else if (cfg.type === 'sq-geo') VIZ.sqGeoLab(el, cfg);
      else if (cfg.type === 'sq-sum') VIZ.sqSumLab(el, cfg);
      else if (cfg.type === 'sq-recur') VIZ.sqRecurLab(el, cfg);
      else if (cfg.type === 'dv-def') VIZ.dvDefLab(el, cfg);
      else if (cfg.type === 'dv-calc') VIZ.dvCalcLab(el, cfg);
      else if (cfg.type === 'dv-mono') VIZ.dvMonoLab(el, cfg);
      else if (cfg.type === 'dv-extreme') VIZ.dvExtremeLab(el, cfg);
      else if (cfg.type === 'dv-opt') VIZ.dvOptLab(el, cfg);
      else if (cfg.type === 'cp-principle') VIZ.cpPrincipleLab(el, cfg);
      else if (cfg.type === 'cp-perm') VIZ.cpPermLab(el, cfg);
      else if (cfg.type === 'cp-comb') VIZ.cpCombLab(el, cfg);
      else if (cfg.type === 'cp-pascal') VIZ.cpPascalLab(el, cfg);
      else if (cfg.type === 'cp-binomial') VIZ.cpBinomialLab(el, cfg);
      else if (cfg.type === 'rv-dist') VIZ.rvDistLab(el, cfg);
      else if (cfg.type === 'rv-mean') VIZ.rvMeanLab(el, cfg);
      else if (cfg.type === 'rv-binom') VIZ.rvBinomLab(el, cfg);
      else if (cfg.type === 'rv-hyper') VIZ.rvHyperLab(el, cfg);
      else if (cfg.type === 'rv-normal') VIZ.rvNormalLab(el, cfg);
      else if (cfg.type === 'pd-scatter') VIZ.pdScatterLab(el, cfg);
      else if (cfg.type === 'pd-regress') VIZ.pdRegressLab(el, cfg);
      else if (cfg.type === 'pd-fit') VIZ.pdFitLab(el, cfg);
      else if (cfg.type === 'pd-table') VIZ.pdTableLab(el, cfg);
      else if (cfg.type === 'pd-chi2') VIZ.pdChi2Lab(el, cfg);
      else if (cfg.type === 'pm-clock') VIZ.pmClockLab(el, cfg);
      else if (cfg.type === 'pm-oral') VIZ.pmOralLab(el, cfg);
      else if (cfg.type === 'pm-measure') VIZ.pmMeasureLab(el, cfg);
      else if (cfg.type === 'pm-vertical') VIZ.pmVerticalLab(el, cfg);
      else if (cfg.type === 'pm-times') VIZ.pmTimesLab(el, cfg);
      else if (cfg.type === 'pm-mult') VIZ.pmMultLab(el, cfg);
      else if (cfg.type === 'pm-rect') VIZ.pmRectLab(el, cfg);
      else if (cfg.type === 'pm-frac') VIZ.pmFracLab(el, cfg);
      else if (cfg.type === 'ep-dir') VIZ.epDirLab(el, cfg);
      else if (cfg.type === 'ep-div') VIZ.epDivLab(el, cfg);
      else if (cfg.type === 'ep-table') VIZ.epTableLab(el, cfg);
      else if (cfg.type === 'ep-mul') VIZ.epMulLab(el, cfg);
      else if (cfg.type === 'ep-area') VIZ.epAreaLab(el, cfg);
      else if (cfg.type === 'ep-cal') VIZ.epCalLab(el, cfg);
      else if (cfg.type === 'ep-dec') VIZ.epDecLab(el, cfg);
      else if (cfg.type === 'ep-match') VIZ.epMatchLab(el, cfg);
      else if (cfg.type === 'p4-num') VIZ.p4NumLab(el, cfg);
      else if (cfg.type === 'p4-area2') VIZ.p4Area2Lab(el, cfg);
      else if (cfg.type === 'p4-ang') VIZ.p4AngLab(el, cfg);
      else if (cfg.type === 'p4-mult') VIZ.p4MultLab(el, cfg);
      else if (cfg.type === 'p4-quad') VIZ.p4QuadLab(el, cfg);
      else if (cfg.type === 'p4-div') VIZ.p4DivLab(el, cfg);
      else if (cfg.type === 'p4-bar') VIZ.p4BarLab(el, cfg);
      else if (cfg.type === 'p4-opt') VIZ.p4OptLab(el, cfg);
      else if (cfg.type === 'p4b-arith') VIZ.p4bArithLab(el, cfg);
      else if (cfg.type === 'p4b-view') VIZ.p4bViewLab(el, cfg);
      else if (cfg.type === 'p4b-law') VIZ.p4bLawLab(el, cfg);
      else if (cfg.type === 'p4b-dec2') VIZ.p4bDec2Lab(el, cfg);
      else if (cfg.type === 'p4b-tri') VIZ.p4bTriLab(el, cfg);
      else if (cfg.type === 'p4b-decalc') VIZ.p4bDecalcLab(el, cfg);
      else if (cfg.type === 'p4b-motion') VIZ.p4bMotionLab(el, cfg);
      else if (cfg.type === 'p4b-avg') VIZ.p4bAvgLab(el, cfg);
      else if (cfg.type === 'p4b-cage') VIZ.p4bCageLab(el, cfg);
    });
  });
})();

/* ============================================================
 * 站内返回导航
 * 站点是网状的（知识点 ↔ 题型 ↔ 知识链），跳两层以上就容易迷路。
 * 这里维护一个轻量访问栈：
 *   - 页面顶部给出「从哪来」的上下文条，一键回原页
 *   - 滚动后左下角浮出「返回上一步」按钮
 * 栈存在 sessionStorage，返回时优先用浏览器历史（最准），
 * 没有站内历史时才按记录的路径跳转。
 * ============================================================ */
(function () {
  'use strict';

  var KEY = 'kz_nav_stack';
  var here = location.pathname + location.search;

  function load() {
    try { return JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function save(s) {
    try { sessionStorage.setItem(KEY, JSON.stringify(s.slice(-24))); } catch (e) { /* 隐私模式下忽略 */ }
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  // 页面标题格式为「名字 - 章节 - 站名」，只保留第一段
  function shortTitle(t) {
    return String(t || '').split(' - ')[0].trim();
  }
  function clip(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n) + '…' : s;
  }
  function whereLabel(u) {
    if (isHome(u)) return '课程目录';
    if (u.indexOf('/pattern/') > -1) return '题型';
    if (/patterns\.html$/.test(u)) return '题型库';
    if (/locate\.html$/.test(u)) return '定位器';
    if (/\/[^/]+\/index\.html$/.test(u)) return '章节';
    return '知识点';
  }
  function isHome(u) {
    return u === '/' || /^\/index\.html$/.test(u) || /^[A-Za-z]:[\\/].*?[\\/]index\.html$/.test(u);
  }

  /* ---------- 1. 维护访问栈 ---------- */
  var stack = load();
  // 回到曾经访问过的页面时，丢弃它之后的历史，避免「返回」绕圈
  for (var i = stack.length - 1; i >= 0; i--) {
    if (stack[i].u === here) { stack = stack.slice(0, i); break; }
  }
  var prev = stack[stack.length - 1] || null;
  var next = stack.concat([{ u: here, t: document.title }]);
  save(next);

  // bfcache（前进/后退恢复）不会重跑脚本，需把栈截断到当前页
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    var s = load();
    for (var j = s.length - 1; j >= 0; j--) {
      if (s[j].u === here) { save(s.slice(0, j + 1)); break; }
    }
  });

  if (!prev) return;

  /* ---------- 2. 顶部「从哪来」上下文条 ---------- */
  if (!isHome(here)) {
    var bar = document.createElement('div');
    bar.className = 'prev-bar';
    bar.innerHTML = '<a class="pb-link" href="' + esc(prev.u) + '"'
      + ' aria-label="回到' + esc(whereLabel(prev.u) + '：' + shortTitle(prev.t)) + '">'
      + '<span class="pb-arrow">←</span>'
      + '<span class="pb-label">回到刚才的' + esc(whereLabel(prev.u)) + '</span>'
      + '<span class="pb-title">' + esc(clip(shortTitle(prev.t), 26)) + '</span>'
      + '</a>';
    var main = document.querySelector('main .container');
    if (main) main.insertBefore(bar, main.firstChild);
  }

  /* ---------- 3. 滚动后浮出的返回按钮 ---------- */
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'back-float';
  btn.title = '返回：' + shortTitle(prev.t);
  btn.innerHTML = '<span class="bf-arrow">←</span>'
    + '<span class="bf-body">'
    + '<span class="bf-main">返回上一步</span>'
    + '<span class="bf-sub">' + esc(clip(shortTitle(prev.t), 18)) + '</span>'
    + '</span>';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    var ref = document.referrer || '';
    var fromSite = ref && (ref.indexOf(location.origin) === 0 || ref.indexOf(location.host) > -1);
    // 浏览器历史最准确；referrer 被裁掉时退回记录的路径
    if (fromSite && history.length > 1) history.back();
    else location.href = prev.u;
  });

  var shown = false;
  function onScroll() {
    var should = (window.pageYOffset || document.documentElement.scrollTop) > 240;
    if (should !== shown) {
      shown = should;
      btn.classList.toggle('show', should);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- 专项图谱：拖动 / 缩放 / 全屏 / 单线聚焦 ---------- */
(function () {
  'use strict';

  function initPZ(root) {
    var stage = root.querySelector('.tg-stage');
    var svg = root.querySelector('.tg-svg');
    if (!stage || !svg) return;

    var vb = svg.viewBox && svg.viewBox.baseVal;
    var W = parseFloat(svg.getAttribute('width')) || (vb ? vb.width : 1200);
    var H = parseFloat(svg.getAttribute('height')) || (vb ? vb.height : 800);
    var MINS = 0.12, MAXS = 3;
    var s = 1, tx = 0, ty = 0;

    root.classList.add('is-live');

    function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
    function apply() {
      stage.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
    }

    function fit(keepScale) {
      var rw = root.clientWidth, rh = root.clientHeight;
      if (!rw || !rh) return;
      if (keepScale) {
        s = clamp(s, MINS, MAXS);
      } else {
        var base = Math.min(rw / W, rh / H);
        // 桌面优先看全貌；窄屏全貌太小看不清字，保底 0.5
        s = clamp(rw < 640 ? Math.max(base, 0.5) : base, MINS, MAXS);
      }
      tx = rw > W * s ? (rw - W * s) / 2 : 0;
      ty = rh > H * s ? (rh - H * s) / 2 : 0;
      apply();
    }

    function zoomAt(ns, cx, cy) {
      ns = clamp(ns, MINS, MAXS);
      var k = ns / s;
      tx = cx - (cx - tx) * k;
      ty = cy - (cy - ty) * k;
      s = ns;
      apply();
    }

    function local(e) {
      var r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    /* 拖动 + 双指缩放 */
    var pts = {}, dragging = false, moved = false, sx = 0, sy = 0, pinchD = 0;

    function count() { return Object.keys(pts).length; }
    function pairDist() {
      var k = Object.keys(pts);
      var a = pts[k[0]], b = pts[k[1]];
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
    function pairMid() {
      var k = Object.keys(pts);
      var a = pts[k[0]], b = pts[k[1]];
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }

    function cap(id) {
      if (root.setPointerCapture) {
        try { root.setPointerCapture(id); } catch (err) {}
      }
    }

    root.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // 工具条按钮不能当成拖动起点，否则指针捕获会把 click 吞掉
      if (e.target.closest && e.target.closest('.tg-tools')) return;
      pts[e.pointerId] = local(e);
      if (count() === 1) {
        dragging = true; moved = false; sx = e.clientX; sy = e.clientY;
        root.classList.add('is-grabbing');
      } else if (count() === 2) {
        pinchD = pairDist();
        // 双指都捕获，抬指在容器外也能收到 pointerup
        cap(e.pointerId);
        var ks = Object.keys(pts);
        for (var i = 0; i < ks.length; i++) cap(+ks[i]);
      }
    });

    root.addEventListener('pointermove', function (e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = local(e);

      if (count() >= 2) {
        var d = pairDist();
        if (pinchD > 0 && d > 0) {
          var m = pairMid();
          zoomAt(s * (d / pinchD), m.x, m.y);
        }
        pinchD = d;
        moved = true;
        root.classList.add('has-moved');
        return;
      }

      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      // 位移超过阈值才认定为拖动：普通点击（章节链接）不受影响
      if (!moved && Math.abs(dx) <= 3 && Math.abs(dy) <= 3) return;
      if (!moved) {
        moved = true;
        root.classList.add('has-moved');
        // 拖动确认后才捕获指针，保证拖出容器后仍能持续跟随
        cap(e.pointerId);
      }
      // 以「上一次事件位置」为基准累加，而不是按下的原始点，否则会越拖越飞
      tx += dx;
      ty += dy;
      sx = e.clientX; sy = e.clientY;
      apply();
    });

    function release(e) {
      delete pts[e.pointerId];
      var left = Object.keys(pts).length;
      if (left) {
        // 双指变单指：用剩下的手指重置拖动基准，避免内容跳位
        var p = pts[Object.keys(pts)[0]];
        var r = root.getBoundingClientRect();
        sx = p.x + r.left; sy = p.y + r.top;
      } else {
        dragging = false; pinchD = 0;
        root.classList.remove('is-grabbing');
      }
    }
    root.addEventListener('pointerup', release);
    root.addEventListener('pointercancel', release);

    /* 拖动结束的那次 click 不该跳到章节页 */
    root.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    root.addEventListener('wheel', function (e) {
      e.preventDefault();
      var p = local(e);
      zoomAt(s * (e.deltaY > 0 ? 0.9 : 1.1), p.x, p.y);
      root.classList.add('has-moved');
    }, { passive: false });

    root.addEventListener('dblclick', function (e) {
      var p = local(e);
      zoomAt(s < 1.5 ? s * 1.6 : 1, p.x, p.y);
    });

    /* 全屏 */
    function toggleFull() {
      var on = root.classList.toggle('is-full');
      document.body.classList.toggle('pz-lock', on);
      var b = root.querySelector('[data-pz-act="full"]');
      if (b) b.textContent = on ? '退出' : '全屏';
      requestAnimationFrame(function () { fit(); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('is-full')) toggleFull();
    });

    var tools = root.querySelector('.tg-tools');
    if (tools) {
      tools.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        var act = b.getAttribute('data-pz-act');
        var rw = root.clientWidth, rh = root.clientHeight;
        if (act === 'in') zoomAt(s * 1.3, rw / 2, rh / 2);
        else if (act === 'out') zoomAt(s / 1.3, rw / 2, rh / 2);
        else if (act === 'fit') fit();
        else if (act === 'full') toggleFull();
      });
    }

    /* 单线聚焦 */
    function focusBand(bi) {
      var g = svg.querySelector('.tg-band[data-band="' + bi + '"]');
      if (!g) return;
      var by = parseFloat(g.getAttribute('data-y')) || 0;
      var bh = parseFloat(g.getAttribute('data-h')) || 120;
      var rw = root.clientWidth, rh = root.clientHeight;
      s = clamp(Math.max(rw / W, 0.55), MINS, MAXS);
      tx = 0;
      ty = clamp((rh - bh * s) / 2 - by * s, -(H * s - rh + 20), 20);
      apply();
    }

    var bar = root.previousElementSibling;
    if (bar && bar.hasAttribute('data-tg-focus')) {
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        var bi = b.getAttribute('data-band');
        Array.prototype.forEach.call(bar.querySelectorAll('button'), function (x) {
          x.classList.toggle('is-on', x === b);
        });
        Array.prototype.forEach.call(svg.querySelectorAll('.tg-band'), function (g) {
          g.classList.toggle('is-focus', bi !== 'all' && g.getAttribute('data-band') === bi);
        });
        if (bi === 'all') { svg.removeAttribute('data-focus'); fit(); }
        else { svg.setAttribute('data-focus', bi); focusBand(bi); }
      });
    }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { fit(true); }, 180);
    });

    fit();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-pz]'), initPZ);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
