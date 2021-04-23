$(document).ready(function() {
    const selectTags = document.querySelector('.profile__list-item');
    const subTags = document.querySelector('.profile__sub-menu');

    //прослушиваем событие клик по гамбургеру
    selectTags.addEventListener('click', function() {
        this.classList.toggle('active');
        subTags.classList.toggle('active');
    });
    //form placeholder
    const formEl = document.querySelectorAll('.form-field');
    for(let item of formEl){
        const thisParent = item.closest('.form-item');
        const FakeEl = thisParent.querySelector('.fake-placeholder');
        //если инпут в фокусе
        item.addEventListener('focus', function(){
            FakeEl.classList.add('active');
        });

        //если инпут теряет фокус
        item.addEventListener('blur', function(){

            if(item.value.length > 0) {
                FakeEl.classList.add('active');
            }
            else {
                FakeEl.classList.remove('active');
            }
        });
    }
    //form validate
    $('.contact-form').validate ({
        rules: {
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Введите email',
                email: 'отсутствует символ @'
            },
            subject: {
                required: 'Введите тему сообщения'
            },
            message: {
                required: 'Введите сообщение'
            }
        }
    })
    //dots
    // Create page-nav dots
	$("#page-nav").onePageNav({
		currentClass: "active",
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: "",
		easing: "swing",
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {},
	});
    //отправка данных
	function ajaxFormSubmit() {
		let string = $(".contact-form").serialize();
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data: string,
			success: function (html) {
				$(".contact-form").slideUp(800);
				$("#answer").html(html);
			},
		});
		return false;
	}

    return false;
    //изменение размера блока 
    // const BigElementBlock = document.querySelector('.portfolio-works__item--big');
    // $('.control-active').click(function(){
    //     BigElementBlock.classList.remove("portfolio-works__item--big");
    // });
});