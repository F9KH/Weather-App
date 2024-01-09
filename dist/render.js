class Render {
    display(cityData) {
        const source = $("#weather-template").html();
        const template = Handlebars.compile(source);
        console.log(cityData);
        let html = template(cityData);

        $(".weather").empty().append(html);
    }   
}





