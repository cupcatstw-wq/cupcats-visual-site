/* =========================================
   booking-form.js
   touched-based validation + Google Apps Script submit
   UX upgrades:
   - phone auto-format: 0912 345 678
   - date min = today, default = tomorrow
   - prevent duplicate submit
========================================= */

(function () {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const submitBtn = document.getElementById("bookingSubmit");
    const statusEl = document.getElementById("bookingStatus");

    /* Google Apps Script Web App URL */
    const APPS_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbyMmJij3FhNL7QgZtNtWJCC-PnRBE3DZRVZH5jnaUUoLNrapGH46Y3jrZA3kWD9Tgy66Q/exec";

    const fields = {
        name: document.getElementById("bk_name"),
        phone: document.getElementById("bk_phone"),
        email: document.getElementById("bk_email"),
        service: document.getElementById("bk_service"),
        date: document.getElementById("bk_date"),
        time: document.getElementById("bk_time"),
        note: document.getElementById("bk_note")
    };

    const errors = {
        name: document.getElementById("err_name"),
        phone: document.getElementById("err_phone"),
        email: document.getElementById("err_email"),
        service: document.getElementById("err_service"),
        date: document.getElementById("err_date"),
        time: document.getElementById("err_time")
    };

    const touched = {
        name: false,
        phone: false,
        email: false,
        service: false,
        date: false,
        time: false
    };

    let isSubmittingNow = false;

    init();

    function init() {
        resetFormOnLoad();
        setDateConstraintsAndDefault();
        resetAllErrors();
        bindEvents();
    }

    function bindEvents() {
        fields.name.addEventListener("blur", function () {
            touched.name = true;
            validateName();
        });

        fields.phone.addEventListener("blur", function () {
            touched.phone = true;
            validatePhone();
        });

        fields.email.addEventListener("blur", function () {
            touched.email = true;
            validateEmail();
        });

        fields.service.addEventListener("change", function () {
            touched.service = true;
            validateService();
        });

        fields.date.addEventListener("change", async function () {
            touched.date = true;
            validateDate();
            await updateAvailableTimes(this.value);
        });

        fields.time.addEventListener("change", function () {
            touched.time = true;
            validateTime();
        });

        fields.name.addEventListener("input", function () {
            if (touched.name) validateName();
        });

        fields.phone.addEventListener("input", function () {
            formatPhoneInput(this);
            if (touched.phone) validatePhone();
        });

        fields.email.addEventListener("input", function () {
            if (touched.email) validateEmail();
        });

        /* 避免在 input/select 中按 Enter 就整張表單送出 */
        form.addEventListener("keydown", function (e) {
            const tag = e.target.tagName.toLowerCase();

            if (e.key === "Enter" && tag !== "textarea") {
                e.preventDefault();
            }
        });

        form.addEventListener("submit", onSubmit);

        /* 有些瀏覽器從 bfcache 回來時會帶舊值 */
        window.addEventListener("pageshow", function (e) {
            if (e.persisted) {
                resetFormOnLoad();
                setDateConstraintsAndDefault();
                resetAllErrors();
                setStatus("", "");
                setSubmitting(false);
                isSubmittingNow = false;
            }
        });
    }

    function formatDate(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    function getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    function getTomorrow() {
        const tomorrow = getToday();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }

    function resetFormOnLoad() {
        form.reset();

        fields.name.value = "";
        fields.phone.value = "";
        fields.email.value = "";
        fields.service.selectedIndex = 0;
        fields.time.selectedIndex = 0;
        fields.note.value = "";
    }

    function setDateConstraintsAndDefault() {
        const today = getToday();
        const tomorrow = getTomorrow();

        fields.date.min = formatDate(today);
        fields.date.value = formatDate(tomorrow);
    }

    function resetAllErrors() {
        Object.keys(errors).forEach(function (key) {
            showError(key, false);
        });

        Object.keys(touched).forEach(function (key) {
            touched[key] = false;
        });
    }

    function showError(key, show, message) {
        const input = fields[key];
        const error = errors[key];

        if (!input || !error) return;

        if (message) {
            error.textContent = message;
        }

        error.hidden = !show;
        input.setAttribute("aria-invalid", show ? "true" : "false");
    }

    function setStatus(message, state) {
        if (!statusEl) return;

        statusEl.textContent = message || "";
        statusEl.hidden = !message;

        if (state) {
            statusEl.setAttribute("data-state", state);
        } else {
            statusEl.removeAttribute("data-state");
        }
    }

    function focusFirstInvalidField() {
        const order = ["name", "phone", "email", "service", "date", "time"];

        for (const key of order) {
            const field = fields[key];

            if (field && field.getAttribute("aria-invalid") === "true") {
                field.focus();
                break;
            }
        }
    }

    function normalizePhone(value) {
        return value.replace(/[^\d]/g, "");
    }

    function formatPhoneDisplay(digits) {
        const clean = digits.slice(0, 10);

        if (clean.length <= 4) {
            return clean;
        }

        if (clean.length <= 7) {
            return clean.slice(0, 4) + " " + clean.slice(4);
        }

        return clean.slice(0, 4) + " " + clean.slice(4, 7) + " " + clean.slice(7);
    }

    function formatPhoneInput(input) {
        const digits = normalizePhone(input.value);
        input.value = formatPhoneDisplay(digits);
    }

    function isValidPhone(value) {
        const digits = normalizePhone(value.trim());

        /* 台灣手機常見 10 碼，這裡保留 9~10 碼彈性 */
        return /^\d{9,10}$/.test(digits);
    }

    function isFutureOrToday(dateString) {
        if (!dateString) return false;

        const selected = new Date(dateString + "T00:00:00");
        const today = getToday();

        return selected >= today;
    }

    function validateName() {
        const value = fields.name.value.trim();

        let ok = value.length > 0;
        let message = "請輸入姓名";

        if (ok && value.length < 2) {
            ok = false;
            message = "姓名至少需 2 個字";
        }

        if (ok && value.length > 20) {
            ok = false;
            message = "姓名請保持在 20 個字以內";
        }

        showError("name", touched.name && !ok, message);
        return ok;
    }

    function validatePhone() {
        const value = fields.phone.value.trim();
        const ok = isValidPhone(value);

        showError("phone", touched.phone && !ok, "請輸入正確的電話號碼");
        return ok;
    }

    function validateEmail() {
        const value = fields.email.value.trim();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        showError("email", touched.email && !ok, "請輸入正確的電子郵件");
        return ok;
    }

    function validateService() {
        const ok = !!fields.service.value;

        showError("service", touched.service && !ok, "請選擇服務項目");
        return ok;
    }

    function validateDate() {
        const value = fields.date.value;

        let ok = !!value;
        let message = "請選擇預約日期";

        if (ok && !isFutureOrToday(value)) {
            ok = false;
            message = "預約日期不可早於今天";
        }

        showError("date", touched.date && !ok, message);
        return ok;
    }

    function validateTime() {
        const ok = !!fields.time.value;

        showError("time", touched.time && !ok, "請選擇預約時段");
        return ok;
    }

    function validateForm() {
        return [
            validateName(),
            validatePhone(),
            validateEmail(),
            validateService(),
            validateDate(),
            validateTime()
        ].every(Boolean);
    }

    function setSubmitting(isSubmitting) {
        submitBtn.disabled = isSubmitting;
        submitBtn.textContent = isSubmitting ? "送出中..." : "送出預約申請";
        submitBtn.setAttribute("aria-busy", isSubmitting ? "true" : "false");
    }

    function getPayload() {
        return {
            name: fields.name.value.trim(),
            phone: normalizePhone(fields.phone.value),
            email: fields.email.value.trim().toLowerCase(),
            service: fields.service.value,
            date: fields.date.value,
            time: fields.time.value,
            note: fields.note.value.trim()
        };
    }

    async function updateAvailableTimes(date) {
        const select = fields.time;

        if (!date) return;

        try {
            const res = await fetch(
                APPS_SCRIPT_ENDPOINT + "?date=" + encodeURIComponent(date)
            );

            const bookedTimes = await res.json();
            const options = select.querySelectorAll("option");

            options.forEach(option => {
                if (!option.value) return;
                if (bookedTimes.includes(option.value)) {
                    option.disabled = true;
                    option.textContent = option.value + "（已滿）";
                } else {
                    option.disabled = false;
                    option.textContent = option.value;
                }
            });

        } catch (err) {
            console.error("取得預約時段失敗", err);
        }
    }

    async function submitToAppsScript(data) {
        const res = await fetch(APPS_SCRIPT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("送出失敗，HTTP 狀態：" + res.status);
        }

        return res;
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (isSubmittingNow) return;

        setStatus("", "");

        Object.keys(touched).forEach(function (key) {
            touched[key] = true;
        });

        const isValid = validateForm();

        if (!isValid) {
            setStatus("請先確認表單內容是否完整。", "error");
            focusFirstInvalidField();
            return;
        }

        try {
            isSubmittingNow = true;
            setSubmitting(true);

            const payload = getPayload();
            await submitToAppsScript(payload);

            form.reset();
            resetAllErrors();
            setDateConstraintsAndDefault();

            setStatus("已收到你的預約申請，我們會再與你確認時間。", "success");
            statusEl.scrollIntoView({ behavior: "smooth", block: "nearest" });

            /* 成功後短暫維持 disabled，避免連點重送 */
            await new Promise(function (resolve) {
                setTimeout(resolve, 1500);
            });
        } catch (err) {
            console.error(err);
            setStatus("送出失敗，請稍後再試。", "error");
        } finally {
            isSubmittingNow = false;
            setSubmitting(false);
        }
    }
})();