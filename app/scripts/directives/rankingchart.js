'use strict';

/**
 * @ngdoc directive
 * @name nagaretetter.directive:rankingChart
 * @description
 * # rankingChart
 */
angular.module('nagaretetter')
.directive('rankingChart', ['d3Service', function (d3Service) {
  return {
    link: function postLink(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        d3.json(
          'http://nagaretetter-server.herokuapp.com/songs/ranking.json',
          //'http://localhost:3000/songs/ranking.json',
          function(error, data) {
            var w = 1000;
            var h = 400;
            //var dataset = [5, 10, 15, 20, 25];
            var ranking = data.ranking;
            var titles = ranking.map(function(d) {
              return d.title;
            });
            var totals = ranking.map(function(d) {
              return d.total;
            });

            //var svg = d3.select('.analysis-main')
            var svg = d3.select(element[0])
            .append("svg")
            .attr("width", w)
            .attr("height", h);

            var g = svg.append('g')
            .attr('transform', 'translate(40, 20)');

            g.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, 150)');
            g.append('g')
            .attr('class', 'y axis');

            var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, w - 100], 0.1)
            .domain(titles);

            var yScale = d3.scale.linear()
            .range([150, 0])
            .domain([0, d3.max(totals)]);

            var rect = g.selectAll('.bar').data(ranking);
            rect.enter().append("rect");
            rect.exit().remove();
            rect.attr('class', 'bar')
            .attr("width", xScale.rangeBand())
            .attr("height", function(d) {
              return 150 - yScale(d.total);
            })
            .attr("x", function(d) {
              return xScale(d.title);
            })
            .attr("y", function(d) {
              return yScale(d.total);
            })
            .attr({
              'data-container': "body",
              'data-toggle': "popover",
              'data-placement': "right"
            })
            .attr('data-content', function(d) {
              return d.title + ' / ' + d.artist;
            })
            .attr('data-title', function(d, i) {
              return (i + 1) + '位 : ' + d.total + '回ナガレテッター';
            });

            var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

            var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickFormat(d3.format('.0'));

            d3.select('.x.axis')
            //.attr("transform", "translate(0," + '150' + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
              return "rotate(-65)"
            });
            d3.select('.y.axis').call(yAxis);

            $('.bar').popover({
              trigger: 'hover'
            });

            $('.loading').hide();
          });
        }, function() {console.log('error');} );
      }
    };
  }]);
