let chart, heightChart;

function calculateFuel() {
    const r = +document.getElementById('radius').value, 
          L = +document.getElementById('length').value,
          h = +document.getElementById('height').value, 
          previousHeight = +document.getElementById('previousHeight').value,
          capacity = +document.getElementById('capacity').value,
          previousAmount = +document.getElementById('previousAmount').value || 0;

    // Calcula o volume em litros
    let A = (r ** 2 * Math.acos((r - h) / r)) - ((r - h) * Math.sqrt(2 * r * h - h ** 2)),
        volume = (A * L) / 1000, 
        percentage = (volume / capacity) * 100,
        litersUsed = previousAmount - volume;

    const resultDiv = document.getElementById('result');

    if (percentage > 100) {
        resultDiv.innerHTML = 'Erro: O volume calculado excede a capacidade do tanque.';
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        return;
    }

    if (isNaN(percentage) || percentage <= 0) {
        resultDiv.innerHTML = 'Erro: O cálculo resultou em um valor inválido.';
        resultDiv.className = 'result error';
        resultDiv.style.display = 'block';
        return;
    }

    let resultMessage = `Seu tanque está em <b>${percentage.toFixed(2)}%</b> com <b>${volume.toFixed(2)}</b> Litros.`;
    
    // Se a quantidade anterior foi fornecida
    if (previousAmount > 0) {
        resultMessage += `<br>Foi consumido <b>${litersUsed.toFixed(2)}</b> litros desde a última medição.`;
        
        const previousTime = document.getElementById('previousTime').value;
        const currentTime = document.getElementById('currentTime').value;
        if (previousTime && currentTime) {
            const previousDateTime = new Date(`1970-01-01T${previousTime}:00`);
            const currentDateTime = new Date(`1970-01-01T${currentTime}:00`);
            const hoursDifference = (currentDateTime - previousDateTime) / (1000 * 60 * 60);
            if (hoursDifference > 0) {
                const averageConsumptionPerHour = litersUsed / hoursDifference;
                resultMessage += `<br>Teve um consumo médio de <b>${averageConsumptionPerHour.toFixed(2)}</b> L/h `;
                resultMessage += `em <b>${hoursDifference.toFixed(2)}</b> horas.`;
            }
        }
    }

    // Se a altura anterior foi fornecida
    if (previousHeight > 0) {
        const previousHeightPercentage = (previousHeight / r) * 100;
        resultMessage += `<br>Altura anterior: <b>${previousHeight} cm</b> (${previousHeightPercentage.toFixed(2)}% do tanque).`;
    }

    resultDiv.innerHTML = resultMessage;
    resultDiv.className = 'result success';
    resultDiv.style.display = 'block';

    updateCharts(percentage, volume, r, h);
}

function clearForm() {
    document.getElementById('fuelForm').reset();
    document.getElementById('result').style.display = 'none';
    document.getElementById('comparisonChart').style.display = 'none';
    if (chart) chart.destroy();
    if (heightChart) heightChart.destroy();
}

function updateCharts(percentage, volume, r, h) {
    // Gráfico de comparação em Litros
    const ctx = document.getElementById('myChart').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Capacidade Total (L)', 'Combustível Atual (L)'],
            datasets: [{
                label: 'Litros',
                data: [volume * (100 / percentage), volume],
                backgroundColor: ['rgba(0, 123, 255, 0.5)', 'rgba(40, 167, 69, 0.5)']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de comparação em Altura (cm)
    const heightCtx = document.getElementById('heightChart').getContext('2d');
    if (heightChart) heightChart.destroy();
    heightChart = new Chart(heightCtx, {
        type: 'bar',
        data: {
            labels: ['Altura Total (cm)', 'Altura Atual (cm)'],
            datasets: [{
                label: 'Altura (cm)',
                data: [r, h],
                backgroundColor: ['rgba(255, 159, 64, 0.5)', 'rgba(54, 162, 235, 0.5)']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
