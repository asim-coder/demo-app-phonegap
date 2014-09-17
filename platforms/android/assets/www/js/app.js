// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- 
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html()); */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    var service = new EmployeeService();
    var slider = new PageSlider($('body'));
    service.initialize().done(function () {
        router.addRoute('', function() {
       // renderHomeView();
        //$('body').html(new HomeView(service).render().$el);  //old one
        slider.slidePage(new HomeView(service).render().$el);//For H/W acceleration
        });
        router.addRoute('employees/:id', function(id) {
            service.findById(parseInt(id)).done(function(employee) {
                //$('body').html(new EmployeeView(employee).render().$el);
                slider.slidePage(new EmployeeView(employee).render().$el);
            });
        });
        router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready',function () {
        StatusBar.overlaysWebView( false );//iOS
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();
        if (navigator.notification) {   //overide default html
            window.alert = function(message) {
                navigator.notification.alert(
                    message,
                    null,   //callback
                    "HelloWorld",   //title
                    'OK'
                    );
            };
        }
    }, false);
    FastClick.attach(document.body); // For removing delay in iOS 

    /* ---------------------------------- Local Functions ---------------------------------- */

}());