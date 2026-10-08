// SkillTwin AI - Visual Charts Manager using Chart.js

let radarChartInstance = null;
let gaugeChartInstance = null;
let gapBarChartInstance = null;

export class ChartManager {
  /**
   * Initializes or updates the Skill Twin Radar Matrix
   */
  static renderRadarChart(canvasId, skillComparisons) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const topItems = skillComparisons.slice(0, 8);
    const labels = topItems.map(item => item.name);
    const currentData = topItems.map(item => item.currentLevel);
    const benchmarkData = topItems.map(item => item.benchmark);

    if (radarChartInstance) {
      radarChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    radarChartInstance = new window.Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Your Current Skill Twin',
            data: currentData,
            backgroundColor: 'rgba(56, 189, 248, 0.25)',
            borderColor: '#38bdf8',
            pointBackgroundColor: '#38bdf8',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#38bdf8',
            borderWidth: 2.5,
            pointRadius: 4
          },
          {
            label: 'Target Job Benchmark',
            data: benchmarkData,
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            borderColor: '#a855f7',
            pointBackgroundColor: '#a855f7',
            pointBorderColor: '#fff',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            pointLabels: {
              color: '#cbd5e1',
              font: {
                size: 11,
                family: "'Plus Jakarta Sans', system-ui, sans-serif",
                weight: '600'
              }
            },
            ticks: {
              display: false,
              backdropColor: 'transparent',
              stepSize: 20
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: { family: "'Plus Jakarta Sans', system-ui, sans-serif", size: 12 },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }

  /**
   * Job Readiness Radial Gauge (Doughnut)
   */
  static renderReadinessGauge(canvasId, percentage) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    if (gaugeChartInstance) {
      gaugeChartInstance.destroy();
    }

    let primaryColor = '#10b981'; // green
    if (percentage < 50) primaryColor = '#f43f5e'; // red/rose
    else if (percentage < 75) primaryColor = '#f59e0b'; // amber

    const ctx = canvas.getContext('2d');
    gaugeChartInstance = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: [primaryColor, 'rgba(255, 255, 255, 0.06)'],
            borderWidth: 0,
            circumference: 270,
            rotation: 225,
            cutout: '78%'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false }
        }
      }
    });
  }

  /**
   * Skill Gap Comparison Horizontal Bar Chart
   */
  static renderGapBarChart(canvasId, comparisons) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    if (gapBarChartInstance) {
      gapBarChartInstance.destroy();
    }

    const items = comparisons.slice(0, 6);
    const labels = items.map(i => i.name);
    const currentVals = items.map(i => i.currentLevel);
    const gapVals = items.map(i => Math.max(0, i.benchmark - i.currentLevel));

    const ctx = canvas.getContext('2d');
    gapBarChartInstance = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Current Skill Level',
            data: currentVals,
            backgroundColor: '#06b6d4',
            borderRadius: 6
          },
          {
            label: 'Skill Gap Needed',
            data: gapVals,
            backgroundColor: 'rgba(244, 63, 94, 0.45)',
            borderColor: '#f43f5e',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            stacked: true,
            grid: { display: false },
            ticks: {
              color: '#e2e8f0',
              font: { size: 11, family: "'Plus Jakarta Sans', system-ui, sans-serif" }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#94a3b8', boxWidth: 12 }
          }
        }
      }
    });
  }
}
