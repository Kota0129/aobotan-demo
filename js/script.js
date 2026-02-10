$(function () {
  // ========================
  // サイドバー hover
  // ========================
  $('.sidebar__item').hover(
    function () {
      $(this).find('.sidebar__submenu').stop(true, true).slideDown();
      $(this).find('.sidebar__link').addClass('active');
    },
    function () {
      $(this).find('.sidebar__submenu').stop(true, true).slideUp();
      $(this).find('.sidebar__link').removeClass('active');
    }
  );

  // ========================
  // slickスライダー
  // ========================
  $('.slick-slider').slick({
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  // ========================
  // モーダル開閉
  // ========================
  $('.js-open').on('click', function () {
    const $item = $(this).closest('.news__item');
    $item.find('.js-modal, .js-mask').removeClass('hidden').addClass('is-active');
    $('body').addClass('is-fixed');
  });

  $('.js-close, .js-mask').on('click', function () {
    const $item = $(this).closest('.news__item');
    $item.find('.js-modal, .js-mask').removeClass('is-active');
    setTimeout(function () {
      $item.find('.js-modal, .js-mask').addClass('hidden');
    }, 400);
    $('body').removeClass('is-fixed');
  });

  // ========================
  // メニュー開閉
  // ========================
  $('.btn-trigger').on('click', function () {
    $(this).toggleClass('active');
    $('.header__nav-wrapper').toggleClass('is-active');
    $('body').toggleClass('is-fixed');
  });
  // ========================
  // ローディング
  // ========================
  function loadingStop() {
    const loading = document.getElementById('loading');
    loading.classList.add('loadingNone'); // フェードアウト開始
  
    setTimeout(() => {
      loading.style.display = 'none'; // 完全非表示
  
      // ローディング完了後処理
      document.body.classList.add('loaded');
  
      // トップページのみ .fv__image にアニメーション
      if (document.body.classList.contains('page-top')) {
        const fvImage = document.querySelector('.fv__image');
        if (fvImage) {
          fvImage.classList.add('is-animate');
        }
      }
    }, 1000); // opacity transition時間に合わせる
  }
  
  window.addEventListener('load', function () {
    const isFirstLoad = sessionStorage.getItem('isFirstLoad');
    const loading = document.getElementById('loading');
    const logo = loading.querySelector('img');
  
    if (!isFirstLoad) {
      loading.style.display = 'block';
  
      // 再生確実化：一度外して再付与
      logo.classList.remove('fadeup');
      void logo.offsetWidth;
      logo.classList.add('fadeup');
  
      // ロゴアニメーション終了後にローディング終了
      setTimeout(() => {
        loadingStop();
      }, 3500); // delay: 2s + duration: 1.2s + margin
      sessionStorage.setItem('isFirstLoad', 'true');
    } else {
      loading.style.display = 'none';
      document.body.classList.add('loaded');
      
      if (document.body.classList.contains('page-top')) {
        const fvImage = document.querySelector('.fv__image');
        if (fvImage) {
          fvImage.classList.add('is-animate');
        }
      }
    }
  });

  // ========================
  // フォームのバリデーション（Vanilla JS）
  // ========================
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact__form');
    const submitBtn = form.querySelector('.submit-btn');

    const nameInputs = form.querySelectorAll('input[name="lastName"], input[name="firstName"]');
    const emailInput = form.querySelector('input[name="email"]');
    const addressInput = form.querySelector('input[name="address"]');
    const confirmCheckbox = form.querySelector('.confirm-checkbox');

    function updateSubmitButtonState() {
      const nameFilled = Array.from(nameInputs).every(input => input.value.trim() !== '');
      const emailFilled = emailInput.value.trim() !== '';
      const addressFilled = addressInput.value.trim() !== '';
      const checkboxChecked = confirmCheckbox.checked;

      const isValid = nameFilled && emailFilled && addressFilled && checkboxChecked;
      submitBtn.disabled = !isValid;
    }

    [...nameInputs, emailInput, addressInput, confirmCheckbox].forEach(input => {
      input.addEventListener('input', updateSubmitButtonState);
      input.addEventListener('change', updateSubmitButtonState);
    });

    updateSubmitButtonState();
  });

  // ========================
  // jQuery版フォーム制御（重複している場合、どちらかに統一しても可）
  // ========================
  const $form = $('.contact__form');
  const $submitBtn = $form.find('.submit-btn');
  const $nameInputs = $form.find('input[name="lastName"], input[name="firstName"]');
  const $emailInput = $form.find('input[name="email"]');
  const $addressInput = $form.find('input[name="address"]');
  const $confirmCheckbox = $form.find('.confirm-checkbox');

  function updateSubmitButtonStateJQ() {
    const nameFilled = $nameInputs.toArray().every(input => input.value.trim() !== '');
    const emailFilled = $emailInput.val().trim() !== '';
    const addressFilled = $addressInput.val().trim() !== '';
    const checkboxChecked = $confirmCheckbox.prop('checked');

    const isValid = nameFilled && emailFilled && addressFilled && checkboxChecked;
    $submitBtn.prop('disabled', !isValid);
  }

  $nameInputs.add($emailInput).add($addressInput).on('input', updateSubmitButtonStateJQ);
  $confirmCheckbox.on('change', updateSubmitButtonStateJQ);
  updateSubmitButtonStateJQ();

  // フォーム送信時の thanks.html 遷移処理
  $form.on('submit', function (e) {
    e.preventDefault();
    if (!$submitBtn.prop('disabled')) {
      window.location.href = 'thanks.html';
    }
  });
});
