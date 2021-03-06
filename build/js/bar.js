var CONSTANTS = {
    DEFAULT_MARGIN: {
      LEFT: 15,
      BOTTOM: 30,
      RIGHT: 15,
      TOP: 15
    },
    ORIENTATION_MARGIN: {
      LEFT: 35,
      BOTTOM: 30,
      RIGHT: 35,
      TOP: 22
    },
    BAR: {
      color: "#4682B4",
      curve: !1,
      opacity: 1,
      padding: .05
    },
    STACKED_BAR: {
      color: ["#CDDC39", "#4CAF50", "#009688", "#00BCD4", "#2196F3", "#3F51B5", "#673AB7"],
      curve: !1,
      opacity: 1,
      padding: .05
    },
    LINE: {
      color: "#4682B4",
      width: 4,
      opacity: 1,
      icon: {
        show: !0,
        width: 10
      }
    },
    MULTI_LINE: {
      color: ["#CDDC39", "#4CAF50", "#009688", "#00BCD4", "#2196F3", "#3F51B5", "#673AB7"],
      width: 4,
      opacity: 1,
      icon: {
        width: 10
      }
    },
    LABEL_WIDTH: 35,
    LABEL_LINE_HEIGHT: .3,
    ICON: {
      DEFAULT_WIDTH: 10,
      DEFAULT_HEIGHT: 10
    },
    DEFAULT_BAR_RADIUS: 0,
    BAR_CHART: {
      type: "bar",
      element: ".fc-bar",
      class: "fc-bar"
    },
    STACK_CHART: {
      type: "stackedBar",
      element: ".fc-stacked-bar",
      class: "fc-stacked-bar"
    },
    LINE_CHART: {
      type: "line",
      element: ".fc-line-point",
      class: "fc-line-point"
    },
    AREA_CHART: {
      type: "line",
      element: ".points",
      class: "points"
    },
    FIRST_CHILD: 1,
    AXIS_CONFIG: {
      X_AXIS: {
        orientation: "bottom",
        firstLabel: !0,
        ticks: {
          fontSize: "13px",
          alignment: "middle",
          padding: 5
        },
        showAxisLine: !0
      },
      Y_AXIS: {
        orientation: "left",
        ticks: {
          fontSize: "13px",
          padding: 5,
          alignment: "end"
        },
        firstLabel: !0,
        showAxisLine: !0
      }
    },
    TOOLTIP: {
      LISTENERS: "mouseover click touchstart",
      BODY: {
        title: "Title",
        xLabel: "X value",
        yLabel: "Y value"
      }
    }
  },
  Chart = function() {};
Chart.prototype.setValues = function(t, e, i, a) {
  var o = this;
  if ("object" == typeof t ? o.element = t : "#" !== t[0] && "." !== t[0] || (o.element = document.querySelector(t)), o.elementClass = o.element.className, o.data = e, o.options = i || {}, a) switch (a.type) {
    case "bar":
      r = o.options.bar;
      o.color = r && r.color ? r.color : CONSTANTS.BAR.color;
      break;
    case "stackedBar":
      var r = o.options.bar;
      o.stackList = a.stack || [], o.color = r && r.color ? r.color : CONSTANTS.STACKED_BAR.color;
      break;
    case "line":
      n = o.options.line;
      o.color = n && n.color ? n.color : CONSTANTS.LINE.color;
      break;
    case "multiLine":
      var n = o.options.line;
      o.color = n && n.color ? n.color : CONSTANTS.MULTI_LINE.color
  }
  var s = o.options.margin;
  o.margin = {
    left: s && s.left ? s.left : 0,
    right: s && s.right ? s.right : 0,
    top: s && s.top ? s.top : 0,
    bottom: s && s.bottom ? s.bottom : 0
  };
  var l = o.options.axis;
  o.options.legend;
  if (l && l.xAxis && l.xAxis.orientation) CONSTANTS.DEFAULT_MARGIN.BOTTOM;
  else CONSTANTS.DEFAULT_MARGIN.TOP;
  var c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  o.width = 0 === o.element.offsetWidth ? c : o.element.offsetWidth, o.height = 0 === o.element.offsetHeight ? d : o.element.offsetHeight, o.elementHeight = 0 === o.element.offsetHeight ? d : o.element.offsetHeight, o.element.addEventListener("touchstart", function(t) {
    t.defaultPrevented()
  }, !1)
}, Chart.prototype.drawChart = function() {
  var t = this,
    e = t.options.legend;
  t.options.axis;
  e && e.show && (e.height ? (t.legendHeight = e.height, t.height -= t.legendHeight, t.elementHeight -= t.legendHeight) : (t.legendHeight = 45, t.height -= t.legendHeight, t.elementHeight -= t.legendHeight)), t.createCanvas(), t.xScales(), t.yScales(), t.addAxes(), t.options.grids && t.addGridLines(t.options.grids)
}, Chart.prototype.createCanvas = function() {
  var t = this;
  d3.select(t.element).selectAll("svg").remove(), t.plot = d3.select(t.element).append("svg").attr("width", "100%").attr("height", t.elementHeight).attr("class", "fc-graph-area")
}, Chart.prototype.xScales = function() {
  var t = this,
    e = t.options.axis,
    i = t.options.bar,
    a = t.margin,
    o = t.width,
    r = t.xExtent,
    n = i && i.padding ? parseFloat(i.padding) : CONSTANTS.BAR.padding;
  e && e.yAxis && e.yAxis.orientation ? "left" === e.yAxis.orientation ? (t.xMin = a.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT, t.xMax = o - (a.right + CONSTANTS.DEFAULT_MARGIN.LEFT)) : (t.xMin = a.left + CONSTANTS.DEFAULT_MARGIN.LEFT, t.xMax = o - (a.right + CONSTANTS.DEFAULT_MARGIN.RIGHT + CONSTANTS.ORIENTATION_MARGIN.RIGHT)) : (t.xMin = a.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT, t.xMax = o - (a.right + CONSTANTS.DEFAULT_MARGIN.RIGHT)), t.xScale = d3.scaleBand().padding(n).range([t.xMin, t.xMax]).domain(r)
}, Chart.prototype.yScales = function() {
  var t = this,
    e = t.margin,
    i = t.options.axis,
    a = t.options.goalLine,
    o = t.height,
    r = t.yExtent;
  i && i.xAxis && i.xAxis.orientation ? "bottom" === i.xAxis.orientation ? (t.yMin = o - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + e.top) : (t.yMin = o - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = e.top + CONSTANTS.DEFAULT_MARGIN.TOP + CONSTANTS.ORIENTATION_MARGIN.TOP) : (t.yMin = o - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + e.top);
  var n = i && i.yAxis && i.yAxis.ticks ? i.yAxis.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
    s = a && a.value ? a.value : 0,
    l = n.values ? n.values : [],
    c = [];
  "object" == typeof l[0] ? l.forEach(function(t) {
    c.push(t.value)
  }) : c = l, r[1] = d3.max([s, r[1], d3.max(c)]), s === r[1] && (r[1] *= 1.1, l.push(Math.round(r[1]))), t.yScale = d3.scaleLinear().rangeRound([t.yMin, t.yMax]).domain(r), 0 === l.length && t.yScale.nice()
}, Chart.prototype.addAxes = function() {
  var t = this,
    e = t.options.axis,
    i = e && e.xAxis ? t.options.axis.xAxis : {},
    a = e && e.yAxis ? t.options.axis.yAxis : {};
  t.addXAxis(i), t.addYAxis(a)
}, Chart.prototype.addXAxis = function(t) {
  var e = this,
    i = (e.margin, e.xScale),
    a = t && t.ticks && t.ticks.padding ? t.ticks.padding : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.padding,
    o = t && void 0 !== t.firstLabel ? t.firstLabel : CONSTANTS.AXIS_CONFIG.X_AXIS.firstLabel,
    r = t && t.orientation ? t.orientation : CONSTANTS.AXIS_CONFIG.X_AXIS.orientation,
    n = t && void 0 !== t.showAxisLine ? t.showAxisLine : CONSTANTS.AXIS_CONFIG.X_AXIS.showAxisLine;
  switch (r) {
    case "top":
      s = d3.axisTop(i).tickPadding(a);
      s = e.checkXAxisLabels(s, t), e.drawXAxis(t, s, e.yMax);
      break;
    default:
      var s = d3.axisBottom(i).tickPadding(a);
      s = e.checkXAxisLabels(s, t), e.drawXAxis(t, s, e.yMin)
  }
  o || (void 0 === e.element.querySelector("#x-axis").children && void 0 !== e.element.querySelector("#x-axis").childNodes[CONSTANTS.FIRST_CHILD] ? e.element.querySelector("#x-axis").childNodes[CONSTANTS.FIRST_CHILD].remove() : void 0 !== e.element.querySelector("#x-axis").children[CONSTANTS.FIRST_CHILD] && e.element.querySelector("#x-axis").children[CONSTANTS.FIRST_CHILD].remove()), n || e.element.querySelector("#x-axis path").remove()
}, Chart.prototype.checkXAxisLabels = function(t, e) {
  var i = this;
  if (e.ticks && e.ticks.values) {
    var a = e.ticks.values;
    if ("object" == typeof a[0]) {
      var o = [],
        r = [];
      a.forEach(function(t) {
        o.push(t.value), r.push(t.label)
      })
    } else var o = a,
      r = a
  } else var o = i.xExtent,
    r = i.xExtent;
  return t.tickValues(o).tickFormat(function(t, i) {
    return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : r[i]
  }), t
}, Chart.prototype.addYAxis = function(t) {
  var e = this,
    i = e.yScale,
    a = t.ticks ? t.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
    o = t && void 0 !== t.firstLabel ? t.firstLabel : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel,
    r = t && t.orientation ? t.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    n = a.padding ? a.padding : "left" === r ? 5 : 30,
    s = t && void 0 !== t.showAxisLine ? t.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine;
  switch (r) {
    case "right":
      l = d3.axisRight(i).tickPadding(n);
      l = e.checkYAxisLabels(l, t), e.drawYAxis(t, l, e.xMax);
      break;
    default:
      var l = d3.axisLeft(i).tickPadding(n);
      l = e.checkYAxisLabels(l, t), e.drawYAxis(t, l, e.xMin)
  }
  o || (void 0 === e.element.querySelector("#y-axis").children && void 0 !== e.element.querySelector("#y-axis").childNodes[CONSTANTS.FIRST_CHILD] ? e.element.querySelector("#y-axis").childNodes[CONSTANTS.FIRST_CHILD].remove() : void 0 !== e.element.querySelector("#y-axis").children[CONSTANTS.FIRST_CHILD] && e.element.querySelector("#y-axis").children[CONSTANTS.FIRST_CHILD].remove()), s || (e.element.querySelector("#y-axis path").remove(), d3.select("#y-axis").selectAll("line").remove())
}, Chart.prototype.checkYAxisLabels = function(t, e) {
  var i = this;
  e && void 0 !== e.firstLabel ? e.firstLabel : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel;
  if (e.ticks && e.ticks.values) {
    var a = e.ticks.values;
    if ("object" == typeof a[0]) {
      var o = [],
        r = [];
      a.indexOf(i.yExtent[0]) < 0 && a.unshift({
        value: i.yExtent[0],
        label: i.yExtent[0]
      }), a.forEach(function(t) {
        o.push(t.value), r.push(t.label)
      })
    } else {
      a.indexOf(i.yExtent[0]) < 0 && a.unshift(i.yExtent[0]);
      var o = a,
        r = a
    }
    t.tickValues(o).tickFormat(function(t, i) {
      return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : r[i]
    })
  } else t.tickFormat(function(t) {
    return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : t
  });
  return t
}, Chart.prototype.drawXAxis = function(t, e, i) {
  var a = this,
    o = (a.defaultMargin(), t.ticks && t.ticks.fontSize ? t.ticks.fontSize : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.fontSize);
  a.xAxisLabels = a.plot.append("g").attr("class", "fc-axis fc-x-axis").attr("id", "x-axis").attr("transform", "translate(0," + i + ")").call(e).selectAll(".tick text").attr("font-size", o), a.checkAxisLabelAlteration(t, "x")
}, Chart.prototype.checkAxisLabelAlteration = function(t, e) {
  var i = this,
    a = t.ticks;
  if (a && a.position) {
    var o = a.position.angle || 0,
      r = a.position.x || "0",
      n = a.position.y || "0";
    i.alterAxisLabel(e, r, n, o)
  }
}, Chart.prototype.drawYAxis = function(t, e, i) {
  var a = this,
    o = (a.margin, t.ticks && t.ticks.alignment ? t.ticks.alignment : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.alignment),
    r = t.ticks && t.ticks.fontSize ? t.ticks.fontSize : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.fontSize;
  a.yAxisLabels = a.plot.append("g").attr("class", "fc-axis fc-y-axis").attr("id", "y-axis").attr("transform", "translate(" + i + ", 0)").call(e).selectAll(".tick text").attr("font-size", r).call(a.wrap, CONSTANTS.LABEL_WIDTH, o), a.checkAxisLabelAlteration(t, "y")
}, Chart.prototype.addGridLines = function(t) {
  var e = this;
  e.options.axis;
  t.vertical && t.vertical.show && e.addVerticalGridLines(t.vertical), t.horizontal && t.horizontal.show && e.addHorizontalGridLines(t.horizontal)
}, Chart.prototype.alterAxisLabel = function(t, e, i, a) {
  var o = this;
  t = "x" === t || "X" === t ? o.xAxisLabels : o.yAxisLabels, 0 === a ? t.attr("transform", "translate(" + e + "," + i + ")") : 0 === e && 0 === i ? t.attr("transform", "rotate(-" + a + ")") : t.attr("transform", "rotate(-" + a + "), translate(" + e + "," + i + ")")
}, Chart.prototype.wrap = function(t, e, i) {
  t.each(function() {
    for (var t, a = d3.select(this), o = a.text().split(/\s+/).reverse(), r = [], n = 0, s = CONSTANTS.LABEL_LINE_HEIGHT, l = a.attr("x"), c = a.attr("y"), d = parseFloat(a.attr("dy")) + s, p = a.text(null).append("tspan").attr("x", l).attr("y", c).attr("dy", d + "em").attr("text-anchor", i); t = o.pop();) r.push(t), p.text(r.join(" ")), p.node().getComputedTextLength() > e && (r.pop(), p.text(r.join(" ")), r = [t], p = a.append("tspan").attr("x", l).attr("y", c).attr("dy", ++n * s + d + "em").attr("text-anchor", i).text(t))
  })
}, Chart.prototype.addVerticalGridLines = function(t) {
  var e = this,
    i = (e.options.legend, e.options.axis),
    a = (e.margin, i && i.xAxis && i.xAxis.orientation && i.xAxis.orientation, e.yMin);
  e.plot.append("g").attr("id", "vertical-grid").attr("class", "fc-grid vertical-grid").attr("transform", "translate(0 ," + a + ")").call(e.verticalGridLines()), [].forEach.call(e.element.querySelectorAll("#vertical-grid line"), function(e) {
    var i = "";
    t.color && (i += "stroke : " + t.color + ";"), t.opacity && (i += "stroke-opacity : " + t.opacity + ";"), e.setAttribute("style", i)
  })
}, Chart.prototype.addHorizontalGridLines = function(t) {
  var e = this,
    i = e.margin,
    a = e.options.axis,
    o = a && a.yAxis && void 0 !== a.yAxis.showAxisLine ? a.yAxis.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
    r = a && a.yAxis && a.yAxis.orientation ? a.yAxis.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    n = o ? "left" === r ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : 0;
  e.plot.append("g").attr("id", "horizontal-grid").attr("class", "fc-grid horizontal-grid").attr("transform", "translate(" + n + ",0)").call(e.horizontalGridLines());
  var s = e.element.querySelectorAll("#horizontal-grid g"),
    l = s.length;
  [].forEach.call(s, function(e, i) {
    var a = "";
    t.color && (a += "stroke : " + t.color + ";"), t.opacity && (a += "stroke-opacity : " + t.opacity + ";"), e.querySelector("line").setAttribute("style", a)
  }), t.skipFirst && s[0].remove(), t.skipLast && s[l - 1].remove()
}, Chart.prototype.addGoalLines = function() {
  var t = this,
    e = t.options.goalLine,
    i = t.margin,
    a = t.options.axis,
    o = a && a.yAxis && void 0 !== a.yAxis.showAxisLine ? a.yAxis.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
    r = a && a.yAxis && a.yAxis.orientation ? a.yAxis.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    n = e.value,
    s = e.class ? "fc-goalLine-line " + e.class : "fc-goalLine-line",
    l = o ? "left" === r ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : 0,
    c = t.yScale(n) - t.yMin,
    d = t.plot.append("g").attr("class", "fc-goalLine");
  if (d.append("g").attr("class", s).attr("transform", "translate(" + l + ", " + c + ")").call(t.goalLine()), e.icon) {
    var p = e.icon.height,
      A = e.icon.width,
      h = e.icon.url,
      T = e.icon.class ? "qd-goalLine-image " + T : "qd-goalLine-image",
      S = e.icon.left ? e.icon.left + i.left - 2.5 : i.left - 2.5;
    o && "left" === r && (S += CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT), e.icon.toBase64 ? t.getBase64Image(h, function(e) {
      d.append("svg:image").attr("x", S).attr("y", t.yScale(n) - p / 2 + 1).attr("width", A).attr("height", p).attr("xlink:href", e).attr("class", T)
    }) : d.append("svg:image").attr("x", S).attr("y", t.yScale(n) - p / 2 + 1).attr("width", A).attr("height", p).attr("xlink:href", h).attr("class", T)
  }
}, Chart.prototype.checkTooltip = function(t) {
  var e, i = this;
  switch (t) {
    case "bar":
      e = CONSTANTS.BAR_CHART;
      break;
    case "stackedBar":
      e = CONSTANTS.STACK_CHART;
      break;
    case "line":
    case "multiLine":
      e = CONSTANTS.LINE_CHART;
      break;
    case "area":
      e = CONSTANTS.AREA_CHART
  }
  if (i.options.tooltip && i.options.tooltip.show) {
    var a = i.options.tooltip.listener ? i.options.tooltip.listener : CONSTANTS.TOOLTIP.LISTENERS;
    i.showTooltip(i.options.tooltip, a, e)
  }
}, Chart.prototype.showTooltip = function(t, e, i) {
  var a, o, r = this,
    n = t.class ? t.class : "";
  d3.select(r.element).selectAll("#fc-tooltip").remove();
  var s = d3.select(r.element).append("div").attr("class", "fc-tooltip " + n).attr("id", "fc-tooltip");
  s.node().style.position = "absolute", s.node().style.visibility = "hidden", r.plot.selectAll(i.element).on(e, function(e) {
    switch (o = d3.event.type, i.type) {
      case "bar":
        t.xValue = e[0], t.yValue = e[1];
        break;
      case "stackedBar":
        t.xValue = e.data[r.xAxisKey], t.yValue = r.valueSum(e.data, r.stackList), t.stackData = e.data;
        break;
      case "line":
        t.xValue = e[0], t.yValue = e[1];
      case "multiline":
        t.xValue = e[0], t.yValue = e[1], t.line = e[2]
    }
    a !== e ? (s.html(t.formatter ? t.formatter() : r.tooltipBody(t)), s.node().style.visibility = "visible", s.node().style.left = r.calculatePosition("left", [t.xValue, t.yValue]), s.node().style.top = r.calculatePosition("top", [t.xValue, t.yValue]), a = "mouseover" != d3.event.type ? e : "") : (s.node().style.visibility = "hidden", a = "")
  }).on("mouseout", function() {
    "mouseover" === o && (s.node().style.visibility = "hidden")
  }), document.addEventListener("touchstart", function(t) {
    t.touches[0];
    t.target.classList.contains(i.class) || (s.node().style.visibility = "hidden")
  }, !1), document.addEventListener("click", function(t) {
    t.target.classList.contains(i.class) || (s.node().style.visibility = "hidden")
  }, !1)
}, Chart.prototype.calculatePosition = function(t, e) {
  var i = this,
    a = i.options.legend,
    o = i.options.line,
    r = i.element.querySelector("#fc-tooltip"),
    n = parseInt(window.getComputedStyle(i.element.querySelector("#fc-tooltip"), ":after").getPropertyValue("border-left-width")),
    s = parseInt(window.getComputedStyle(i.element.querySelector("#fc-tooltip"), ":after").getPropertyValue("border-top-width")),
    l = n > s ? n : s,
    c = l + r.offsetHeight,
    d = r.classList,
    p = i.xScale(e[0]) + i.shiftCalculate("x", "#fc-tooltip", l),
    A = i.element.offsetTop + i.yScale(e[1]) + i.shiftCalculate("y", "#fc-tooltip", l) - i.margin.top;
  return o && o.plotPoints && o.plotPoints.icon && o.plotPoints.icon.width && (A -= o.plotPoints.icon.width / 2), A - i.element.offsetTop < 0 ? (A += c + l, o && o.plotPoints && o.plotPoints.icon && o.plotPoints.icon.width && (A += o.plotPoints.icon.width + 2), d.add("bottom"), d.remove("left", "top", "right")) : (d.remove("bottom", "left", "right"), d.add("top")), p - i.element.offsetLeft < 0 ? (p += r.offsetWidth / 2 + l, A += c / 2 + l / 2, d.add("right"), d.remove("bottom", "top")) : p + r.offsetWidth > i.element.offsetWidth && (p -= r.offsetWidth / 2 + l, A += c / 2 + l / 2, d.remove("bottom", "top", "right"), d.add("left")), "left" === t ? p + "px" : a && "top" === a.position ? A + i.legendHeight + l / 2 + "px" : A + "px"
}, Chart.prototype.shiftCalculate = function(t, e, i) {
  var a = this,
    o = a.element.querySelector(e).offsetWidth,
    r = a.element.querySelector(e).offsetHeight,
    n = a.xScale.bandwidth() / 2 - o / 2,
    s = -(r + i);
  return a.margin && (s += a.margin.top), "x" === t || "X" === t ? n : "y" === t || "Y" === t ? s : void 0
}, Chart.prototype.tooltipBody = function(t) {
  if (t.body) {
    return title = t.body.title ? t.body.title : CONSTANTS.TOOLTIP.BODY.title, xLabel = t.body.xLabel ? t.body.xLabel : CONSTANTS.TOOLTIP.BODY.xLabel, yLabel = t.body.yLabel ? t.body.yLabel : CONSTANTS.TOOLTIP.BODY.yLabel, xValue = t.xValue, yValue = t.yValue, content = "", title && (content += "<b>" + title + "</b>"), xLabel && (content += "<br/>" + xLabel + ": " + xValue), yLabel && (content += "<br/>" + yLabel + ": " + yValue), content
  }
}, Chart.prototype.verticalGridLines = function() {
  var t = this,
    e = t.options.grids,
    i = (t.options.axis, t.yMin - t.yMax),
    a = d3.axisBottom(t.xScale).tickSize(-i).tickFormat("");
  if (e && e.vertical && e.vertical.values) {
    var o = e.vertical.values;
    if ("object" == typeof o[0]) {
      r = [];
      o.forEach(function(t) {
        r.push(t.key)
      })
    } else var r = o;
    a.tickValues(r)
  }
  return a
}, Chart.prototype.horizontalGridLines = function() {
  var t = this,
    e = t.options.axis,
    i = t.options.grids,
    a = e && e.xAxis && e.xAxis.showAxisLine ? t.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + t.margin.left) : t.width,
    o = e && e.yAxis && e.yAxis.orientation ? e.yAxis.orientation : "left";
  e && e.xAxis && e.xAxis.showAxisLine && (a -= "left" === o ? CONSTANTS.ORIENTATION_MARGIN.LEFT : CONSTANTS.ORIENTATION_MARGIN.RIGHT);
  var r = d3.axisLeft(t.yScale).tickSize(-a).tickFormat("");
  if (i && i.horizontal && i.horizontal.values) {
    var n = i.horizontal.values;
    n.indexOf(t.yExtent[0]) < 0 && n.unshift(t.yExtent[0]), r.tickValues(n)
  }
  return r
}, Chart.prototype.goalLine = function() {
  var t = this,
    e = t.options.axis,
    i = e && e.xAxis && e.xAxis.showAxisLine ? t.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + t.margin.left) : t.width,
    a = e && e.yAxis && e.yAxis.orientation ? e.yAxis.orientation : "left";
  return e && e.xAxis && e.xAxis.showAxisLine && (i -= "left" === a ? CONSTANTS.ORIENTATION_MARGIN.LEFT : CONSTANTS.ORIENTATION_MARGIN.RIGHT), d3.axisLeft(t.yScale).tickSize(-i).ticks(1).tickFormat("")
}, Chart.prototype.defaultMargin = function() {
  var t = this.options.axis;
  return t && t.yAxis && t.yAxis.orientation ? "left" === t.yAxis.orientation ? CONSTANTS.DEFAULT_MARGIN.LEFT : 0 : "left" === CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation ? CONSTANTS.DEFAULT_MARGIN.LEFT : 0
}, Chart.prototype.valueSum = function(t, e) {
  var i = 0;
  for (var a in t) t.hasOwnProperty(a) && -1 !== e.indexOf(a) && (i += parseFloat(t[a]));
  return i
}, Chart.prototype.isNumber = function(t) {
  var e;
  return !isNaN(t) && (0 | (e = parseFloat(t))) === e
}, Chart.prototype.getBase64Image = function(t, e) {
  var i = new Image;
  i.setAttribute("crossOrigin", "anonymous"), i.src = t, i.id = "qd-image-id";
  var a = document.createElement("div");
  a.style.display = "none", a.id = "qd-invisible-div", document.body.appendChild(a), i.onload = function() {
    a.appendChild(i);
    var t = document.createElement("canvas");
    t.width = i.width, t.height = i.height, t.getContext("2d").drawImage(i, 0, 0);
    var o = t.toDataURL("image/png");
    d3.selectAll("#qd-image-id").remove(), d3.selectAll("#qd-invisible-div").remove(), e(o)
  }
}, Array.prototype.diff = function(t) {
  return this.filter(function(e) {
    return t.indexOf(e) < 0
  })
}, Array.prototype.unique = function() {
  for (var t = [], e = 0, i = this.length; e < i; e++) - 1 === t.indexOf(this[e]) && t.push(this[e]);
  return t
}, Array.range = function(t, e, i) {
  var a = [];
  for (i = i || 1, a[0] = t; t + i <= e;) a[a.length] = t += i;
  return a
}, void 0 === Element.prototype.remove && (Element.prototype.remove = function() {
  this.parentNode && this.parentNode.removeChild(this)
}), void 0 === String.prototype.contains && (String.prototype.contains = function() {
  return -1 !== String.prototype.indexOf.apply(this, arguments)
});
var BarChart = function(t, e, i) {
  var a = this;
  a.setValues(t, e, i, {
    type: "bar"
  }), a.xExtent = a.xExtentCalculate(a.data), a.yExtent = a.yExtentCalculate(a.data), a.drawBarChart("bar"), window.addEventListener("resize", function(o) {
    a.setValues(t, e, i, {
      type: "bar"
    }), a.drawBarChart("bar")
  })
};
BarChart.prototype = Object.create(Chart.prototype), BarChart.prototype.xExtentCalculate = function(t) {
  return t.map(function(t) {
    return t[0]
  })
}, BarChart.prototype.yExtentCalculate = function(t) {
  var e = d3.extent(t, function(t) {
    return t[1]
  });
  return e[0] > 0 && (e[0] = 0), e
}, BarChart.prototype.drawBarChart = function(t) {
  var e = this,
    i = e.margin;
  e.drawChart(), e.plot.append("clipPath").attr("id", "bar-clip").append("rect").attr("x", 0).attr("y", 0).attr("width", e.width).attr("height", e.height - (i.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM)), e.checkGoalLine(), e.createBars(t, e.data), e.checkTransition(), e.checkTooltip(t)
}, BarChart.prototype.createBars = function(t, e) {
  var i = this;
  i.margin, i.options.bar ? i.options.bar : CONSTANTS.BAR;
  switch (t) {
    case "bar":
      a = i.plot.append("g").attr("class", "fc-bars ");
      i.bar = a.selectAll("bar").data(e).enter().append("path").attr("class", "fc-bar").attr("fill", i.color);
      break;
    case "stackedBar":
      var a = i.plot.append("g").attr("class", "fc-stacked-bars");
      i.groups = a.selectAll("g.stack").data(i.stack_data).enter().append("g").style("fill", function(t, e) {
        return i.color[e]
      }), i.rect = i.groups.selectAll("path").data(function(t) {
        return t
      }).enter().append("path").attr("class", "fc-stacked-bar")
  }
}, BarChart.prototype.checkTransition = function() {
  var t = this,
    e = t.options.transition,
    i = t.calculateBarwidth();
  if (e && e.animate) {
    var a = e.delay ? e.delay : 0,
      o = e.duration ? e.duration : 1e3;
    t.drawBarsWithAnimation(i, a, o)
  } else t.drawBarsWithoutAnimation(i)
}, BarChart.prototype.checkGoalLine = function() {
  var t = this;
  t.options.goalLine && t.options.goalLine.value && t.addGoalLines()
}, BarChart.prototype.calculateBarwidth = function() {
  var t = this,
    e = t.options.bar,
    i = e && e.width ? e.width : t.xScale.bandwidth();
  return i = i > t.xScale.bandwidth() ? t.xScale.bandwidth() : i
}, BarChart.prototype.drawBarsWithAnimation = function(t, e, i) {
  var a = this,
    o = a.options.bar,
    r = a.barCentering(t, a.xScale.bandwidth()),
    n = o && o.opacity ? o.opacity : CONSTANTS.BAR.opacity;
  a.bar.attr("d", function(e) {
    var i = a.xScale(e[0]) + r;
    return a.drawRoundedRectangle(e, i, a.yMin, t, 0, 0)
  }).attr("clip-path", "url(#bar-clip)").transition().delay(function(t, i) {
    return i * e
  }).duration(i).attr("d", function(e) {
    return a.drawBar(e, r, t)
  }).attr("opacity", n)
}, BarChart.prototype.drawBarsWithoutAnimation = function(t) {
  var e = this,
    i = e.options.bar,
    a = i && i.opacity ? i.opacity : CONSTANTS.BAR.opacity,
    o = e.barCentering(t, e.xScale.bandwidth());
  e.bar.attr("d", function(i) {
    return e.drawBar(i, o, t)
  }).attr("clip-path", "url(#bar-clip)").attr("opacity", a)
}, BarChart.prototype.drawRoundedRectangle = function(t, e, i, a, o, r) {
  return "M" + (e + r) + " " + i + "h" + (a - 2 * r) + "a" + r + " " + r + " 0 0 1 " + r + " " + r + "v" + (o - 2 * r) + "v" + r + "h" + -r + "h" + (2 * r - a) + "h" + -r + "v" + -r + "v" + (2 * r - o) + "a" + r + " " + r + " 0 0 1 " + r + " " + -r + "z"
}, BarChart.prototype.drawBar = function(t, e, i) {
  var a, o, r, n, s = this,
    l = s.options.bar;
  return n = l && l.curve ? i / 2 : 0, a = s.xScale(t[0]) + e, o = s.yScale(t[1]), r = s.yMin - s.yScale(t[1]), s.drawRoundedRectangle(t, a, o, i, r, n)
}, BarChart.prototype.barCentering = function(t) {
  var e = this;
  return t < e.xScale.bandwidth() ? (e.xScale.bandwidth() - t) / 2 : 0
};