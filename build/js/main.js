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
  var n = this;
  if ("object" == typeof t ? n.element = t : "#" !== t[0] && "." !== t[0] || (n.element = document.querySelector(t)), n.elementClass = n.element.className, n.data = e, n.options = i || {}, a) switch (a.type) {
    case "bar":
      o = n.options.bar;
      n.color = o && o.color ? o.color : CONSTANTS.BAR.color;
      break;
    case "stackedBar":
      var o = n.options.bar;
      n.stackList = a.stack || [], n.color = o && o.color ? o.color : CONSTANTS.STACKED_BAR.color;
      break;
    case "line":
      r = n.options.line;
      n.color = r && r.color ? r.color : CONSTANTS.LINE.color;
      break;
    case "multiLine":
      var r = n.options.line;
      n.color = r && r.color ? r.color : CONSTANTS.MULTI_LINE.color
  }
  var l = n.options.margin;
  n.margin = {
    left: l && l.left ? l.left : 0,
    right: l && l.right ? l.right : 0,
    top: l && l.top ? l.top : 0,
    bottom: l && l.bottom ? l.bottom : 0
  };
  var s = n.options.axis;
  n.options.legend;
  if (s && s.xAxis && s.xAxis.orientation) CONSTANTS.DEFAULT_MARGIN.BOTTOM;
  else CONSTANTS.DEFAULT_MARGIN.TOP;
  var c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  n.width = 0 === n.element.offsetWidth ? c : n.element.offsetWidth, n.height = 0 === n.element.offsetHeight ? d : n.element.offsetHeight, n.elementHeight = 0 === n.element.offsetHeight ? d : n.element.offsetHeight, n.element.addEventListener("touchstart", function(t) {
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
    n = t.width,
    o = t.xExtent,
    r = i && i.padding ? parseFloat(i.padding) : CONSTANTS.BAR.padding;
  e && e.yAxis && e.yAxis.orientation ? "left" === e.yAxis.orientation ? (t.xMin = a.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT, t.xMax = n - (a.right + CONSTANTS.DEFAULT_MARGIN.LEFT)) : (t.xMin = a.left + CONSTANTS.DEFAULT_MARGIN.LEFT, t.xMax = n - (a.right + CONSTANTS.DEFAULT_MARGIN.RIGHT + CONSTANTS.ORIENTATION_MARGIN.RIGHT)) : (t.xMin = a.left + CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.ORIENTATION_MARGIN.LEFT, t.xMax = n - (a.right + CONSTANTS.DEFAULT_MARGIN.RIGHT)), t.xScale = d3.scaleBand().padding(r).range([t.xMin, t.xMax]).domain(o)
}, Chart.prototype.yScales = function() {
  var t = this,
    e = t.margin,
    i = t.options.axis,
    a = t.options.goalLine,
    n = t.height,
    o = t.yExtent;
  i && i.xAxis && i.xAxis.orientation ? "bottom" === i.xAxis.orientation ? (t.yMin = n - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + e.top) : (t.yMin = n - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = e.top + CONSTANTS.DEFAULT_MARGIN.TOP + CONSTANTS.ORIENTATION_MARGIN.TOP) : (t.yMin = n - (e.bottom + CONSTANTS.DEFAULT_MARGIN.BOTTOM), t.yMax = CONSTANTS.DEFAULT_MARGIN.TOP + e.top);
  var r = i && i.yAxis && i.yAxis.ticks ? i.yAxis.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
    l = a && a.value ? a.value : 0,
    s = r.values ? r.values : [],
    c = [];
  "object" == typeof s[0] ? s.forEach(function(t) {
    c.push(t.value)
  }) : c = s, o[1] = d3.max([l, o[1], d3.max(c)]), l === o[1] && (o[1] *= 1.1, s.push(Math.round(o[1]))), t.yScale = d3.scaleLinear().rangeRound([t.yMin, t.yMax]).domain(o), 0 === s.length && t.yScale.nice()
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
    n = t && void 0 !== t.firstLabel ? t.firstLabel : CONSTANTS.AXIS_CONFIG.X_AXIS.firstLabel,
    o = t && t.orientation ? t.orientation : CONSTANTS.AXIS_CONFIG.X_AXIS.orientation,
    r = t && void 0 !== t.showAxisLine ? t.showAxisLine : CONSTANTS.AXIS_CONFIG.X_AXIS.showAxisLine;
  switch (o) {
    case "top":
      l = d3.axisTop(i).tickPadding(a);
      l = e.checkXAxisLabels(l, t), e.drawXAxis(t, l, e.yMax);
      break;
    default:
      var l = d3.axisBottom(i).tickPadding(a);
      l = e.checkXAxisLabels(l, t), e.drawXAxis(t, l, e.yMin)
  }
  n || (void 0 === e.element.querySelector("#x-axis").children && void 0 !== e.element.querySelector("#x-axis").childNodes[CONSTANTS.FIRST_CHILD] ? e.element.querySelector("#x-axis").childNodes[CONSTANTS.FIRST_CHILD].remove() : void 0 !== e.element.querySelector("#x-axis").children[CONSTANTS.FIRST_CHILD] && e.element.querySelector("#x-axis").children[CONSTANTS.FIRST_CHILD].remove()), r || e.element.querySelector("#x-axis path").remove()
}, Chart.prototype.checkXAxisLabels = function(t, e) {
  var i = this;
  if (e.ticks && e.ticks.values) {
    var a = e.ticks.values;
    if ("object" == typeof a[0]) {
      var n = [],
        o = [];
      a.forEach(function(t) {
        n.push(t.value), o.push(t.label)
      })
    } else var n = a,
      o = a
  } else var n = i.xExtent,
    o = i.xExtent;
  return t.tickValues(n).tickFormat(function(t, i) {
    return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : o[i]
  }), t
}, Chart.prototype.addYAxis = function(t) {
  var e = this,
    i = e.yScale,
    a = t.ticks ? t.ticks : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks,
    n = t && void 0 !== t.firstLabel ? t.firstLabel : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel,
    o = t && t.orientation ? t.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    r = a.padding ? a.padding : "left" === o ? 5 : 30,
    l = t && void 0 !== t.showAxisLine ? t.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine;
  switch (o) {
    case "right":
      s = d3.axisRight(i).tickPadding(r);
      s = e.checkYAxisLabels(s, t), e.drawYAxis(t, s, e.xMax);
      break;
    default:
      var s = d3.axisLeft(i).tickPadding(r);
      s = e.checkYAxisLabels(s, t), e.drawYAxis(t, s, e.xMin)
  }
  n || (void 0 === e.element.querySelector("#y-axis").children && void 0 !== e.element.querySelector("#y-axis").childNodes[CONSTANTS.FIRST_CHILD] ? e.element.querySelector("#y-axis").childNodes[CONSTANTS.FIRST_CHILD].remove() : void 0 !== e.element.querySelector("#y-axis").children[CONSTANTS.FIRST_CHILD] && e.element.querySelector("#y-axis").children[CONSTANTS.FIRST_CHILD].remove()), l || (e.element.querySelector("#y-axis path").remove(), d3.select("#y-axis").selectAll("line").remove())
}, Chart.prototype.checkYAxisLabels = function(t, e) {
  var i = this;
  e && void 0 !== e.firstLabel ? e.firstLabel : CONSTANTS.AXIS_CONFIG.Y_AXIS.firstLabel;
  if (e.ticks && e.ticks.values) {
    var a = e.ticks.values;
    if ("object" == typeof a[0]) {
      var n = [],
        o = [];
      a.indexOf(i.yExtent[0]) < 0 && a.unshift({
        value: i.yExtent[0],
        label: i.yExtent[0]
      }), a.forEach(function(t) {
        n.push(t.value), o.push(t.label)
      })
    } else {
      a.indexOf(i.yExtent[0]) < 0 && a.unshift(i.yExtent[0]);
      var n = a,
        o = a
    }
    t.tickValues(n).tickFormat(function(t, i) {
      return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : o[i]
    })
  } else t.tickFormat(function(t) {
    return e && e.ticks && e.ticks.formatter ? e.ticks.formatter(t) : t
  });
  return t
}, Chart.prototype.drawXAxis = function(t, e, i) {
  var a = this,
    n = (a.defaultMargin(), t.ticks && t.ticks.fontSize ? t.ticks.fontSize : CONSTANTS.AXIS_CONFIG.X_AXIS.ticks.fontSize);
  a.xAxisLabels = a.plot.append("g").attr("class", "fc-axis fc-x-axis").attr("id", "x-axis").attr("transform", "translate(0," + i + ")").call(e).selectAll(".tick text").attr("font-size", n), a.checkAxisLabelAlteration(t, "x")
}, Chart.prototype.checkAxisLabelAlteration = function(t, e) {
  var i = this,
    a = t.ticks;
  if (a && a.position) {
    var n = a.position.angle || 0,
      o = a.position.x || "0",
      r = a.position.y || "0";
    i.alterAxisLabel(e, o, r, n)
  }
}, Chart.prototype.drawYAxis = function(t, e, i) {
  var a = this,
    n = (a.margin, t.ticks && t.ticks.alignment ? t.ticks.alignment : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.alignment),
    o = t.ticks && t.ticks.fontSize ? t.ticks.fontSize : CONSTANTS.AXIS_CONFIG.Y_AXIS.ticks.fontSize;
  a.yAxisLabels = a.plot.append("g").attr("class", "fc-axis fc-y-axis").attr("id", "y-axis").attr("transform", "translate(" + i + ", 0)").call(e).selectAll(".tick text").attr("font-size", o).call(a.wrap, CONSTANTS.LABEL_WIDTH, n), a.checkAxisLabelAlteration(t, "y")
}, Chart.prototype.addGridLines = function(t) {
  var e = this;
  e.options.axis;
  t.vertical && t.vertical.show && e.addVerticalGridLines(t.vertical), t.horizontal && t.horizontal.show && e.addHorizontalGridLines(t.horizontal)
}, Chart.prototype.alterAxisLabel = function(t, e, i, a) {
  var n = this;
  t = "x" === t || "X" === t ? n.xAxisLabels : n.yAxisLabels, 0 === a ? t.attr("transform", "translate(" + e + "," + i + ")") : 0 === e && 0 === i ? t.attr("transform", "rotate(-" + a + ")") : t.attr("transform", "rotate(-" + a + "), translate(" + e + "," + i + ")")
}, Chart.prototype.wrap = function(t, e, i) {
  t.each(function() {
    for (var t, a = d3.select(this), n = a.text().split(/\s+/).reverse(), o = [], r = 0, l = CONSTANTS.LABEL_LINE_HEIGHT, s = a.attr("x"), c = a.attr("y"), d = parseFloat(a.attr("dy")) + l, h = a.text(null).append("tspan").attr("x", s).attr("y", c).attr("dy", d + "em").attr("text-anchor", i); t = n.pop();) o.push(t), h.text(o.join(" ")), h.node().getComputedTextLength() > e && (o.pop(), h.text(o.join(" ")), o = [t], h = a.append("tspan").attr("x", s).attr("y", c).attr("dy", ++r * l + d + "em").attr("text-anchor", i).text(t))
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
    n = a && a.yAxis && void 0 !== a.yAxis.showAxisLine ? a.yAxis.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
    o = a && a.yAxis && a.yAxis.orientation ? a.yAxis.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    r = n ? "left" === o ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : 0;
  e.plot.append("g").attr("id", "horizontal-grid").attr("class", "fc-grid horizontal-grid").attr("transform", "translate(" + r + ",0)").call(e.horizontalGridLines());
  var l = e.element.querySelectorAll("#horizontal-grid g"),
    s = l.length;
  [].forEach.call(l, function(e, i) {
    var a = "";
    t.color && (a += "stroke : " + t.color + ";"), t.opacity && (a += "stroke-opacity : " + t.opacity + ";"), e.querySelector("line").setAttribute("style", a)
  }), t.skipFirst && l[0].remove(), t.skipLast && l[s - 1].remove()
}, Chart.prototype.addGoalLines = function() {
  var t = this,
    e = t.options.goalLine,
    i = t.margin,
    a = t.options.axis,
    n = a && a.yAxis && void 0 !== a.yAxis.showAxisLine ? a.yAxis.showAxisLine : CONSTANTS.AXIS_CONFIG.Y_AXIS.showAxisLine,
    o = a && a.yAxis && a.yAxis.orientation ? a.yAxis.orientation : CONSTANTS.AXIS_CONFIG.Y_AXIS.orientation,
    r = e.value,
    l = e.class ? "fc-goalLine-line " + e.class : "fc-goalLine-line",
    s = n ? "left" === o ? CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : CONSTANTS.DEFAULT_MARGIN.LEFT + i.left : 0,
    c = t.yScale(r) - t.yMin,
    d = t.plot.append("g").attr("class", "fc-goalLine");
  if (d.append("g").attr("class", l).attr("transform", "translate(" + s + ", " + c + ")").call(t.goalLine()), e.icon) {
    var h = e.icon.height,
      p = e.icon.width,
      u = e.icon.url,
      f = e.icon.class ? "qd-goalLine-image " + f : "qd-goalLine-image",
      A = e.icon.left ? e.icon.left + i.left - 2.5 : i.left - 2.5;
    n && "left" === o && (A += CONSTANTS.ORIENTATION_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.LEFT), e.icon.toBase64 ? t.getBase64Image(u, function(e) {
      d.append("svg:image").attr("x", A).attr("y", t.yScale(r) - h / 2 + 1).attr("width", p).attr("height", h).attr("xlink:href", e).attr("class", f)
    }) : d.append("svg:image").attr("x", A).attr("y", t.yScale(r) - h / 2 + 1).attr("width", p).attr("height", h).attr("xlink:href", u).attr("class", f)
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
  var a, n, o = this,
    r = t.class ? t.class : "";
  d3.select(o.element).selectAll("#fc-tooltip").remove();
  var l = d3.select(o.element).append("div").attr("class", "fc-tooltip " + r).attr("id", "fc-tooltip");
  l.node().style.position = "absolute", l.node().style.visibility = "hidden", o.plot.selectAll(i.element).on(e, function(e) {
    switch (n = d3.event.type, i.type) {
      case "bar":
        t.xValue = e[0], t.yValue = e[1];
        break;
      case "stackedBar":
        t.xValue = e.data[o.xAxisKey], t.yValue = o.valueSum(e.data, o.stackList), t.stackData = e.data;
        break;
      case "line":
        t.xValue = e[0], t.yValue = e[1];
      case "multiline":
        t.xValue = e[0], t.yValue = e[1], t.line = e[2]
    }
    a !== e ? (l.html(t.formatter ? t.formatter() : o.tooltipBody(t)), l.node().style.visibility = "visible", l.node().style.left = o.calculatePosition("left", [t.xValue, t.yValue]), l.node().style.top = o.calculatePosition("top", [t.xValue, t.yValue]), a = "mouseover" != d3.event.type ? e : "") : (l.node().style.visibility = "hidden", a = "")
  }).on("mouseout", function() {
    "mouseover" === n && (l.node().style.visibility = "hidden")
  }), document.addEventListener("touchstart", function(t) {
    t.touches[0];
    t.target.classList.contains(i.class) || (l.node().style.visibility = "hidden")
  }, !1), document.addEventListener("click", function(t) {
    t.target.classList.contains(i.class) || (l.node().style.visibility = "hidden")
  }, !1)
}, Chart.prototype.calculatePosition = function(t, e) {
  var i = this,
    a = i.options.legend,
    n = i.options.line,
    o = i.element.querySelector("#fc-tooltip"),
    r = parseInt(window.getComputedStyle(i.element.querySelector("#fc-tooltip"), ":after").getPropertyValue("border-left-width")),
    l = parseInt(window.getComputedStyle(i.element.querySelector("#fc-tooltip"), ":after").getPropertyValue("border-top-width")),
    s = r > l ? r : l,
    c = s + o.offsetHeight,
    d = o.classList,
    h = i.xScale(e[0]) + i.shiftCalculate("x", "#fc-tooltip", s),
    p = i.element.offsetTop + i.yScale(e[1]) + i.shiftCalculate("y", "#fc-tooltip", s) - i.margin.top;
  return n && n.plotPoints && n.plotPoints.icon && n.plotPoints.icon.width && (p -= n.plotPoints.icon.width / 2), p - i.element.offsetTop < 0 ? (p += c + s, n && n.plotPoints && n.plotPoints.icon && n.plotPoints.icon.width && (p += n.plotPoints.icon.width + 2), d.add("bottom"), d.remove("left", "top", "right")) : (d.remove("bottom", "left", "right"), d.add("top")), h - i.element.offsetLeft < 0 ? (h += o.offsetWidth / 2 + s, p += c / 2 + s / 2, d.add("right"), d.remove("bottom", "top")) : h + o.offsetWidth > i.element.offsetWidth && (h -= o.offsetWidth / 2 + s, p += c / 2 + s / 2, d.remove("bottom", "top", "right"), d.add("left")), "left" === t ? h + "px" : a && "top" === a.position ? p + i.legendHeight + s / 2 + "px" : p + "px"
}, Chart.prototype.shiftCalculate = function(t, e, i) {
  var a = this,
    n = a.element.querySelector(e).offsetWidth,
    o = a.element.querySelector(e).offsetHeight,
    r = a.xScale.bandwidth() / 2 - n / 2,
    l = -(o + i);
  return a.margin && (l += a.margin.top), "x" === t || "X" === t ? r : "y" === t || "Y" === t ? l : void 0
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
    var n = e.vertical.values;
    if ("object" == typeof n[0]) {
      o = [];
      n.forEach(function(t) {
        o.push(t.key)
      })
    } else var o = n;
    a.tickValues(o)
  }
  return a
}, Chart.prototype.horizontalGridLines = function() {
  var t = this,
    e = t.options.axis,
    i = t.options.grids,
    a = e && e.xAxis && e.xAxis.showAxisLine ? t.width - (CONSTANTS.DEFAULT_MARGIN.LEFT + CONSTANTS.DEFAULT_MARGIN.RIGHT + t.margin.left) : t.width,
    n = e && e.yAxis && e.yAxis.orientation ? e.yAxis.orientation : "left";
  e && e.xAxis && e.xAxis.showAxisLine && (a -= "left" === n ? CONSTANTS.ORIENTATION_MARGIN.LEFT : CONSTANTS.ORIENTATION_MARGIN.RIGHT);
  var o = d3.axisLeft(t.yScale).tickSize(-a).tickFormat("");
  if (i && i.horizontal && i.horizontal.values) {
    var r = i.horizontal.values;
    r.indexOf(t.yExtent[0]) < 0 && r.unshift(t.yExtent[0]), o.tickValues(r)
  }
  return o
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
    var n = t.toDataURL("image/png");
    d3.selectAll("#qd-image-id").remove(), d3.selectAll("#qd-invisible-div").remove(), e(n)
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
  }), a.xExtent = a.xExtentCalculate(a.data), a.yExtent = a.yExtentCalculate(a.data), a.drawBarChart("bar"), window.addEventListener("resize", function(n) {
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
      n = e.duration ? e.duration : 1e3;
    t.drawBarsWithAnimation(i, a, n)
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
    n = a.options.bar,
    o = a.barCentering(t, a.xScale.bandwidth()),
    r = n && n.opacity ? n.opacity : CONSTANTS.BAR.opacity;
  a.bar.attr("d", function(e) {
    var i = a.xScale(e[0]) + o;
    return a.drawRoundedRectangle(e, i, a.yMin, t, 0, 0)
  }).attr("clip-path", "url(#bar-clip)").transition().delay(function(t, i) {
    return i * e
  }).duration(i).attr("d", function(e) {
    return a.drawBar(e, o, t)
  }).attr("opacity", r)
}, BarChart.prototype.drawBarsWithoutAnimation = function(t) {
  var e = this,
    i = e.options.bar,
    a = i && i.opacity ? i.opacity : CONSTANTS.BAR.opacity,
    n = e.barCentering(t, e.xScale.bandwidth());
  e.bar.attr("d", function(i) {
    return e.drawBar(i, n, t)
  }).attr("clip-path", "url(#bar-clip)").attr("opacity", a)
}, BarChart.prototype.drawRoundedRectangle = function(t, e, i, a, n, o) {
  return "M" + (e + o) + " " + i + "h" + (a - 2 * o) + "a" + o + " " + o + " 0 0 1 " + o + " " + o + "v" + (n - 2 * o) + "v" + o + "h" + -o + "h" + (2 * o - a) + "h" + -o + "v" + -o + "v" + (2 * o - n) + "a" + o + " " + o + " 0 0 1 " + o + " " + -o + "z"
}, BarChart.prototype.drawBar = function(t, e, i) {
  var a, n, o, r, l = this,
    s = l.options.bar;
  return r = s && s.curve ? i / 2 : 0, a = l.xScale(t[0]) + e, n = l.yScale(t[1]), o = l.yMin - l.yScale(t[1]), l.drawRoundedRectangle(t, a, n, i, o, r)
}, BarChart.prototype.barCentering = function(t) {
  var e = this;
  return t < e.xScale.bandwidth() ? (e.xScale.bandwidth() - t) / 2 : 0
};
var LineChart = function(t, e, i) {
  var a = this;
  a.setValues(t, e, i, {
    type: "line"
  }), a.xExtent = a.xExtentCalculate(a.data), a.yExtent = a.yExtentCalculate(a.data), a.initiateDraw("line"), window.addEventListener("resize", function(n) {
    a.setValues(t, e, i, {
      type: "line"
    }), a.initiateDraw("line")
  })
};
LineChart.prototype = Object.create(Chart.prototype), LineChart.prototype.xExtentCalculate = function(t) {
  return t.map(function(t) {
    return t[0]
  })
}, LineChart.prototype.yExtentCalculate = function(t) {
  var e = d3.extent(t, function(t) {
    return t[1]
  });
  return e[0] > 0 && (e[0] = 0), e
}, LineChart.prototype.initiateDraw = function(t) {
  var e = this,
    i = e.options.threshold;
  e.dataExist = e.doesDataExist(e.data), i && i.value && i.icon && i.icon.url && e.dataExist ? i.icon.toBase64 ? e.getBase64Image(i.icon.url, function(i) {
    e.thresholdIconUrl = i, e.drawLineChart(t)
  }) : (e.thresholdIconUrl = i.icon.url, e.drawLineChart(t)) : e.drawLineChart(t)
}, LineChart.prototype.drawLineChart = function(t) {
  var e = this,
    i = e.options.line ? e.options.line : CONSTANTS.LINE;
  threshold = e.options.threshold, connectNull = e.options.connectNull, e.drawChart(), e.dataExist && (e.checkGoalLine(), e.line = d3.line().x(function(t) {
    return e.xScale(t[0]) + e.xScale.bandwidth() / 2
  }).y(function(t) {
    return e.yScale(t[1])
  }).defined(function(t, e) {
    return null != t[1]
  }).curve(d3.curveMonotoneX), e.drawLine(t, e.data, i, threshold, connectNull, "line"), e.checkTransition())
}, LineChart.prototype.drawLine = function(t, e, i, a, n, o) {
  var r = this,
    l = r.plot.append("g").attr("class", "fc-line").attr("id", "fc-" + o),
    s = n ? e.filter(r.line.defined()) : e,
    c = i && i.width ? i.width : 4,
    d = i && i.class ? "fc-line-stroke " + i.class : "fc-line-stroke",
    h = i && i.color ? i.color : r.color;
  l.selectAll(".line").data([e]).enter().append("path").attr("class", d).attr("id", "fc-path-" + o).attr("stroke", h).attr("stroke-width", c).attr("d", r.line(s)).attr("fill", "none").attr("clip-path", "url(#fc-clip-" + o + ")"), i && i.icon && i.icon.show && r.drawPlotPoints(t, l, s, i, a, o), r.clipPath = r.plot.append("clipPath").attr("id", "fc-clip-" + o).append("rect")
}, LineChart.prototype.drawPlotPoints = function(t, e, i, a, n, o) {
  var r = this,
    l = n && n.value ? n.value : null,
    s = a.icon,
    c = i.filter(function(t) {
      if (null === l) {
        if (null !== t[1]) return t
      } else if (null !== t[1] && t[1] < l) return t
    }),
    d = i.filter(function(t) {
      if (null !== l && null !== t[1] && t[1] >= l) return t
    });
  s && s.url ? s.toBase64 ? r.getBase64Image(s.url, function(i) {
    r.addImagePlotPoints(e, c, s, i, o), r.addImagePlotPoints(e, d, s, r.thresholdIconUrl, o), r.checkTooltip(t)
  }) : (r.addImagePlotPoints(e, c, s, s.url, o), r.addImagePlotPoints(e, d, s, r.thresholdIconUrl, o), r.checkTooltip(t)) : (r.addColorPlotPoints(e, c, a, s.url, o), r.addImagePlotPoints(e, d, s, r.thresholdIconUrl, o), r.checkTooltip(t))
}, LineChart.prototype.addImagePlotPoints = function(t, e, i, a, n) {
  var o = this,
    r = ".fc-" + n;
  iconWidth = i.width ? i.width : CONSTANTS.LINE.icon.width, t.selectAll(r).data(e.filter(function(t) {
    return null !== t[1]
  })).enter().append("svg:image").attr("class", "fc-line-point").attr("x", function(t) {
    return o.xScale(t[0]) + o.xScale.bandwidth() / 2 - iconWidth / 2
  }).attr("y", function(t) {
    return o.yScale(t[1]) - iconWidth / 2
  }).attr("width", iconWidth).attr("height", iconWidth).attr("xlink:href", a).attr("clip-path", "url(#fc-clip-" + n + ")")
}, LineChart.prototype.addColorPlotPoints = function(t, e, i, a, n) {
  var o = this,
    r = i.icon;
  currentLine = ".fc-" + n, iconWidth = r.width ? r.width : CONSTANTS.LINE.icon.width, radius = i && i.width ? 1.25 * i.width : 1.25 * CONSTANTS.LINE.width, color = i && i.color ? i.color : o.color, t.selectAll(currentLine).data(e).enter().append("circle").attr("class", "fc-line-point").attr("cx", function(t) {
    return o.xScale(t[0]) + o.xScale.bandwidth() / 2
  }).attr("cy", function(t) {
    return o.yScale(t[1])
  }).attr("r", radius).attr("stroke-width", 1).attr("stroke", color).attr("fill", "#fff").attr("clip-path", "url(#fc-clip-" + n + ")")
}, LineChart.prototype.checkTransition = function() {
  var t = this,
    e = t.options.transition;
  if (e && e.animate) {
    var i = e.duration ? e.duration : 1e3;
    t.drawLineWithAnimation(i)
  } else t.drawLineWithoutAnimation()
}, LineChart.prototype.checkGoalLine = function() {
  var t = this;
  t.options.goalLine && t.options.goalLine.value && t.addGoalLines()
}, LineChart.prototype.drawLineWithAnimation = function(t) {
  var e = this,
    i = e.margin,
    a = e.height + i.top + i.bottom + CONSTANTS.DEFAULT_MARGIN.TOP;
  e.clipPath.attr("width", 0).attr("height", a).transition().duration(t).attr("width", e.width)
}, LineChart.prototype.drawLineWithoutAnimation = function() {
  var t = this;
  t.clipPath.attr("width", t.width).attr("height", t.height)
}, LineChart.prototype.doesDataExist = function(t) {
  return !!(t && t.length > 0)
};
var MultiLineChart = function(t, e, i) {
  var a = this;
  a.setValues(t, e, i, {
    type: "multiLine"
  }), a.xExtent = a.xExtentCalculate(a.data), a.yExtent = a.yExtentCalculate(a.data), a.initiateDraw("multiLine"), window.addEventListener("resize", function(n) {
    a.setValues(t, e, i), a.initiateDraw("multiLine")
  })
};
MultiLineChart.prototype = Object.create(LineChart.prototype), MultiLineChart.prototype.xExtentCalculate = function(t) {
  return this.flattenArray(t).map(function(t) {
    return t[0]
  }).unique()
}, MultiLineChart.prototype.yExtentCalculate = function(t) {
  var e = this,
    i = d3.extent(e.flattenArray(t).map(function(t) {
      return t[1]
    }));
  return i[0] > 0 && (i[0] = 0), i
}, MultiLineChart.prototype.drawLineChart = function(t) {
  var e = this,
    i = e.options.line ? e.options.line : {};
  legend = e.options.legend, threshold = e.options.threshold ? e.options.threshold : {}, transition = e.options.transition, legend && legend.show && "top" === legend.position && e.checkLegend(t, e.data), e.drawChart(), e.dataExist && (e.checkGoalLine(), e.line = d3.line().x(function(t) {
    return e.xScale(t[0]) + e.xScale.bandwidth() / 2
  }).y(function(t) {
    return e.yScale(t[1])
  }).defined(function(t, e) {
    return null != t[1]
  }).curve(d3.curveMonotoneX), transition && transition.delay && transition.delay > 0 ? e.drawMultiLinesWithDelay(t, e.data, i, threshold, transition.delay, 0) : e.drawMultiLinesWithoutDelay(t, e.data, i, threshold, 0)), legend && legend.show && "bottom" === legend.position && e.checkLegend(t, e.data)
}, MultiLineChart.prototype.drawMultiLinesWithDelay = function(t, e, i, a, n, o) {
  var r = this,
    l = r.options.connectNull,
    s = r.getLineConfig(i, o),
    c = r.getThresholdConfig(a, o),
    d = "line-" + String(o + 1);
  r.drawLine(t, e[o].value, s, c, l[o], d), r.checkTransition(), ++o < e.length && setTimeout(function() {
    r.drawMultiLinesWithDelay(t, e, i, a, n, o)
  }, n)
}, MultiLineChart.prototype.drawMultiLinesWithoutDelay = function(t, e, i, a) {
  var n = this;
  e.forEach(function(e, o) {
    var r = n.getLineConfig(i, o),
      l = n.getThresholdConfig(a, o),
      s = "line-" + String(o + 1);
    n.drawLine(t, e.value, r, l, s), n.checkTransition()
  })
}, MultiLineChart.prototype.getLineConfig = function(t, e) {
  var i = this,
    a = {
      icon: {}
    };
  return a.color = i.color[e], a.width = t && t.width ? t.width instanceof Array ? void 0 !== t.width[e] ? t.width[e] : CONSTANTS.MULTI_LINE.width : t.width : CONSTANTS.MULTI_LINE.width, a.icon.show = !!(t && t.icon && t.icon.show) && (t.icon.show instanceof Array ? void 0 !== t.icon.show[e] && t.icon.show[e] : t.icon.show), a.icon.url = t && t.icon && t.icon.url ? t.icon.url instanceof Array ? t.icon.url[e] : t.icon.url : null, a.icon.toBase64 = !!(t && t.icon && t.icon.toBase64) && (t.icon.toBase64 instanceof Array ? void 0 !== t.icon.toBase64[e] && t.icon.toBase64[e] : t.icon.toBase64), a.icon.width = t && t.icon && t.icon.width ? t.icon.width instanceof Array ? void 0 !== t.icon.width[e] ? t.icon.width[e] : CONSTANTS.MULTI_LINE.icon.width : t.icon.width : CONSTANTS.MULTI_LINE.icon.width, a
}, MultiLineChart.prototype.getThresholdConfig = function(t, e) {
  var i = {
    icon: {}
  };
  return i.value = t && t.value ? t.value instanceof Array ? t.value[e] : t.value : null, i.icon.url = t && t.icon && t.icon.url ? t.icon.url instanceof Array ? t.icon.url[e] : t.icon.url : null, i.icon.toBase64 = !!(t && t.icon && t.icon.toBase64) && (t.icon.toBase64 instanceof Array ? void 0 !== t.icon.toBase64[e] && t.icon.toBase64[e] : t.icon.toBase64), i
}, MultiLineChart.prototype.checkLegend = function(t, e) {
  var i = this;
  i.options.legend && i.options.legend.show && i.addLegend(t, e)
}, MultiLineChart.prototype.addLegend = function(t, e) {
  var i = this,
    a = i.options.line,
    n = i.options.legend,
    o = n && n.class ? "fc-legend " + n.class : "fc-legend",
    r = i.width / e.length;
  d3.select(i.element).selectAll("#fc-legend").remove();
  var l = d3.select(i.element).append("div").attr("class", o).attr("id", "fc-legend");
  e.forEach(function(t, e) {
    var o = i.checkClickable(n, e),
      s = null !== document.ontouchstart ? "click" : "touchstart";
    t.active = !0;
    var c = l.append("div").attr("id", "fc-legend-" + String(e + 1)).attr("class", "fc-legend-element").on(s, function() {
      if (o) return i.toggleVisibility(t, e)
    });
    if (c.node().style.width = r, o || (c.node().style.cursor = "default"), n && n.show)
      if (a.icon && a.icon.url && a.icon.url[e]) {
        var d = a.icon.url[e];
        i.getBase64Image(d, function(e) {
          c.append("img").attr("src", e), c.append("span").text(t.key)
        })
      } else c.append("div").attr("class", "fc-legend-circle").node().style.background = i.color[e], c.append("span").attr("float", "left").text(t.key)
  })
}, MultiLineChart.prototype.checkClickable = function(t, e) {
  return !(!t || !(t.clickable[e] || void 0 === t.clickable[e] && t.clickable))
}, MultiLineChart.prototype.toggleVisibility = function(t, e) {
  var i = this;
  i.options.legend;
  return t.active ? (d3.select(i.element).selectAll("#fc-line-" + String(e + 1)).transition(100).style("display", "none"), d3.select(i.element).selectAll("#fc-legend-" + String(e + 1)).transition(100).style("opacity", .5)) : (d3.select(i.element).selectAll("#fc-line-" + String(e + 1)).transition(100).style("display", null), d3.select(i.element).selectAll("#fc-legend-" + String(e + 1)).transition(100).style("opacity", 1)), t.active = !t.active, t
}, MultiLineChart.prototype.flattenArray = function(t) {
  var e = [];
  return t.forEach(function(t) {
    e.push(t.value)
  }), [].concat.apply([], e)
}, MultiLineChart.prototype.doesDataExist = function(t) {
  if (t && t.length > 0)
    for (i = 0; i < t.length; i++)
      if (t[i].value.length > 0) return !0;
  return !1
};
var StackedBarChart = function(t, e, i, a) {
  var n = this;
  n.setValues(t, e, a, {
    type: "stackedBar",
    stack: i
  }), n.createStack(), n.xExtent = n.xExtentCalculate(n.data), n.yExtent = n.yExtentCalculate(n.data), n.drawBarChart("stackedBar"), window.addEventListener("resize", function(o) {
    n.setValues(t, e, a, {
      type: "stackedBar",
      stack: i
    }), n.drawBarChart("stackedBar")
  })
};
StackedBarChart.prototype = Object.create(BarChart.prototype), StackedBarChart.prototype.createStack = function() {
  var t = this,
    e = t.options.bar;
  t.stack = d3.stack().keys(t.stackList).order(d3.stackOrderNone).offset(d3.stackOffsetNone), t.stack_data = t.stack(t.data), e && e.curve && e.curve.show && "ALL" === e.curve.bars.toUpperCase() && (t.stack_data.reverse().forEach(function(t) {
    for (var e = t.length, i = 0; i < e; i++) t[i][0] = 0
  }), t.color.reverse()), t.xAxisKey = Object.keys(t.data[0]).diff(t.stackList)[0]
}, StackedBarChart.prototype.xExtentCalculate = function(t) {
  var e = this;
  return Object.keys(t).map(function(i) {
    return t[i][e.xAxisKey]
  })
}, StackedBarChart.prototype.yExtentCalculate = function(t) {
  var e = this,
    i = d3.extent(t.map(function(t) {
      return e.valueSum(t, e.stackList)
    }));
  return i[0] > 0 && (i[0] = 0), i
}, StackedBarChart.prototype.drawBarsWithAnimation = function(t, e, i) {
  var a = this,
    n = a.barCentering(t, a.xScale.bandwidth());
  a.rect.attr("d", function(e) {
    var i = n + a.xScale(e.data[a.xAxisKey]),
      o = a.yMin;
    return a.drawRoundedRectangle(e, i, o, t, 0, 0)
  }).attr("clip-path", "url(#bar-clip)").transition().delay(function(t, i) {
    return i * e
  }).duration(i).attr("d", function(e) {
    return a.drawBar(e, n, t)
  })
}, StackedBarChart.prototype.drawBarsWithoutAnimation = function(t) {
  var e = this,
    i = e.barCentering(t, e.xScale.bandwidth());
  e.rect.attr("d", function(a) {
    return e.drawBar(a, i, t)
  }).attr("clip-path", "url(#bar-clip)")
}, StackedBarChart.prototype.drawBar = function(t, e, i) {
  var a = this,
    n = a.options.bar;
  if (n && n.curve && n.curve.show) o = i / 2;
  else var o = 0;
  var r = e + a.xScale(t.data[a.xAxisKey]),
    l = a.valueSum(t.data, a.stackList);
  if (isNaN(t[1])) {
    s = a.yScale(t[0]);
    height = 0
  } else {
    var s = a.yScale(t[1]);
    height = a.yScale(t[0]) - a.yScale(t[1])
  }
  return n && n.curve && n.curve.show && "ALL" === n.curve.bars.toUpperCase() ? a.drawRoundedRectangle(t, r, s, i, height, o) : l === t[1] ? a.drawRoundedRectangle(t, r, s, i, height, o) : a.drawRoundedRectangle(t, r, s, i, height, 0)
};