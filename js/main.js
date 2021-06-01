$( document ).ready(function() {
    $('#filtername .form-filter-button').click(function(){
    setTimeout(filteringredients, 100);
    });
     $('#filterproperty .form-filter-button').click(function(){
        setTimeout(filteringredients, 100);

    });
     $('#filteringredients .form-filter-button').click(function(){
        setTimeout(filterapplicationns, 100);
    });
     $('#filternameapp .form-filter-button').click(function(){
        setTimeout(filterapplicationns, 100);
    });

//     if(!$(this).find('input').hasClass('all') &&  $(this).closest('.form-box-select').find('.all').is(':checked')){
//
//                $(this).closest('.form-box-select').find('.all').click();
//        }


//    $('.all').change(function(){
//        if ($(this).is(':checked')) {
//             $(this).closest('.form-box-select').find('.js-select-all').click();
//        }
//    });

});

function filteringredients(){
    var name='';
    var property='';
    $('#filtername input').each(function(){
        if ($(this).is(':checked')) {
            if(name){
                name=name+','+$(this).val();
            }else{
                 name=$(this).val();
            }
        }
    });
     $('#filterproperty input').each(function(){
        if ($(this).is(':checked')) {
            if(property){
                property=property+','+$(this).val();
            }else{
                property=$(this).val();
            }
        }
    });
     if ($('#allname').is(':checked')) {
        name=0;
    }
       if ($('#allproperty').is(':checked')) {
        property=0;
    }

        var data = {
            'action': 'filteringredients',
            'name': name,
            'property' : property,
        };
        $.ajax({
            url:ajaxurl, // обработчик
            data:data, // данные
            type:'POST', // тип запроса
            success:function(data){
                if( data ) {
                 $('#allingredients').html('');
                    $('#allingredients').html(data);
                }
            }
        });
}

function filterapplicationns(){
    var ingredients='';
    var name='';
     $('#filteringredients input').each(function(){
        if ($(this).is(':checked')) {
            if(ingredients){
                ingredients=ingredients+','+$(this).val();
            }else{
                ingredients=$(this).val();
            }
        }
    });
        $('#filternameapp input').each(function(){
            if ($(this).is(':checked')) {
                if(name){
                    name=name+','+$(this).val();
                }else{
                     name=$(this).val();
                }
            }
        });
       if ($('#allingredients').is(':checked')) {
        ingredients=0;
    }
     if ($('#allname').is(':checked')) {
        name=0;
    }
        var data = {
            'action': 'filterapplicationns',
            'ingredients' : ingredients,
            'name': name,
        };
        $.ajax({
            url:ajaxurl, // обработчик
            data:data, // данные
            type:'POST', // тип запроса
            success:function(data){
                if( data ) {
                 $('#allapplications').html('');
                    $('#allapplications').html(data);
                }
            }
        });
}































