$(document).ready(function(){
    var apiKey = 'b8100ab66f024dbd05e283098b69a2bc';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-33.031817&lon=-71.539551&appid=' + apiKey;

    const date = new Date();
    var currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0); // Fecha actual a las 12:00:00

    // Formatea la fecha actual
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedDay = day < 10 ? '0' + day : day;
    let formattedMonth = month < 10 ? '0' + month : month;
    let fullDate = `${year}-${formattedMonth}-${formattedDay}`;

    var horamediodia = ' 12:00:00'
    var horadia = ' 15:00:00'

    var mediodia = fullDate + horamediodia
    var dia= fullDate + horadia

    console.log(mediodia)
    console.log(dia)
    var cont = 0

    $('#spinner').show();

    $.getJSON(apiUrl, function(data){
        var forecasts = data.list;

        // Itera sobre los pronósticos y crea las tarjetas
        $.each(forecasts, function(index, forecast){
            var forecastDate = forecast.dt_txt;
            x = cont+1
            valor ="caja"+x.toString()

            // Filtra los pronósticos para mostrar solo los de las horas deseadas
            if (forecastDate.includes('12:00:00') || forecastDate.includes('15:00:00')) {
                var minTemp = Math.trunc(forecast.main.temp_min - 273.15) + ' °C';
                var maxTemp = Math.trunc(forecast.main.temp_max - 273.15)  + ' °C';
                var main = forecast.weather[0].main;
                var description = forecast.weather[0].description;

                if(main == 'Clouds'){
                    main = 'Nublado'
                }
                if(main == 'Rain'){
                    main = 'Lluvia'
                }
                if(main == 'Clear'){
                    main = 'Despejado'
                }

                // Crea la tarjeta con los datos
                var cardHtml = '<div class="col mb-4 card">';
                cardHtml += '<h5 class="card-title" style="text-align: center;">Santuario Caelestis</h5>';
                cardHtml += '<hr>';
                cardHtml += '<p>Fecha de visita: ' + forecastDate + '</p>';
                cardHtml += '<p>Temperatura Máxima: ' + maxTemp + '</p>';
                cardHtml += '<p>Clima: ' + main + '</p>';
                cardHtml += '<button type="button" class="btn btn-primary btn-modal" data-bs-toggle="modal" data-bs-target="#ModalVisita"';
                cardHtml += ' data-forecast-date="' + forecastDate + '"';
                cardHtml += ' data-max-temp="' + maxTemp + '"';
                cardHtml += ' data-main="' + main + '"';
                cardHtml += ' data-description="' + description + '">';
                cardHtml += 'Reservar Hora';
                cardHtml += '</button>';
                cardHtml += '</div>';

                // Agrega la tarjeta al contenedor
                $("."+valor).append(cardHtml);
                cont++
            }
        });

        $('#spinner').hide();


        $(document).on('click', '.btn-modal', function() {
            // Obtiene los datos adjuntos al botón
            var forecastDate = $(this).data('forecast-date');
            var maxTemp = $(this).data('max-temp');
            var main = $(this).data('main');

            // Construye el contenido del modal
            var modalContent = '<p>Fecha de visita: ' + forecastDate + '</p>';
            modalContent += '<p>Temperatura Máxima: ' + maxTemp + '</p>';
            modalContent += '<p>Clima: ' + main + '</p>';

            // Muestra la información en el modal
            $('#modal-texto').html(modalContent);
        });

        $('#guardar-reserva').on('click', function() {
            console.log('1');
            alert('Reserva guardada exitosamente.');
            $('#ModalVisita').modal('hide'); // Cierra el modal
        });
    });
});


function guardarReserva() {
    console.log('2');
    alert('hola');
  }