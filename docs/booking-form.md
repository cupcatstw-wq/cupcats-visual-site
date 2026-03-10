# Booking Form Setup

This document explains how the booking form works.

## Overview

The booking form uses:

- JavaScript validation
- Google Apps Script
- Google Sheets

The form sends booking data to a Google Sheet.

## Main Script

File:

`/assets/js/booking-form.js`

Features:

- touched-based validation
- field error messages
- submit status feedback
- async submission
- phone auto-formatting
- date defaulting to tomorrow

## Apps Script Endpoint

The current form submits to this Apps Script Web App:

`https://script.google.com/macros/s/AKfycbyMmJij3FhNL7QgZtNtWJCC-PnRBE3DZRVZH5jnaUUoLNrapGH46Y3jrZA3kWD9Tgy66Q/exec`

## Google Sheet Structure

Columns must follow this order:

1. 時間
2. 姓名
3. 電話
4. 電子郵件
5. 服務項目
6. 預約日期
7. 預約時段
8. 備註
9. 預約狀態
10. 確認時間

## Phone Number Formatting

The phone number is formatted automatically in the form:

`0912345678 → 0912 345 678`

Before submission, the script converts it back to plain digits:

`0912345678`

The Google Sheet must preserve the leading zero.

## Booking Status

Default status:

`未確認`

The `確認時間` column is left blank by default.

## Demo vs Production

Current version is suitable for:

- demonstration
- lightweight client projects
- small service businesses

Future production upgrades may include:

- time slot conflict checking
- disabled fully booked slots
- customer confirmation email
- admin dashboard