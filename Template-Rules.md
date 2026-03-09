# Frontend Template Rules v2
(Cupcats Visual Template)

這是一套 **可複製、可維護、可擴充** 的前端模板規範。

目標不是限制寫法，而是確保：

- 半年後仍然能看懂
- 多個專案仍然保持一致
- CSS 不會逐漸失控
- 新頁面能快速建立
- 模板可以長期使用

本模板為 **純 HTML + CSS + JS 的靜態網站架構**，不依賴任何前端框架。

---

# 一、專案結構

/assets
  /css
    00-tokens.css
    01-reset-base.css
    02-layout.css
    03-typography.css
    10-components.css
    20-header.css
    21-hero.css
    22-services.css
    23-booking.css
    24-faq.css
    25-footer.css
    90-utilities.css
    99-responsive.css

  /js
    main.js
    partials.js

  /img

/partials
  header.html
  footer.html

/docs
  Template-Rules.md

---

# 二、CSS 架構（Design System）

CSS 採用 **分層設計系統**

Layer 1  
Design Tokens

Layer 2  
Base

Layer 3  
Layout

Layer 4  
Components

Layer 5  
Sections

Layer 6  
Utilities

Layer 7  
Responsive

---

# 三、CSS 檔案責任分工

00-tokens.css  
設計 Token（color / spacing / radius / shadow / container）

01-reset-base.css  
Reset / normalize / base element

02-layout.css  
Layout 系統（container / section spacing）

03-typography.css  
語意文字基礎（h1–h3、p）

10-components.css  
所有可重用元件

20-header.css  
Header / Nav

21-hero.css  
Hero section

22-services.css  
Services section

23-booking.css  
Booking section

24-faq.css  
FAQ section

25-footer.css  
Footer

90-utilities.css  
Utility class

99-responsive.css  
全站 RWD

---

# 四、命名規範

所有 class 必須使用前綴系統

s-  
Section

l-  
Layout

c-  
Component

u-  
Utility

---

# 五、HTML 結構示例

section  
class="s-services"

container  
class="l-container l-servicesGrid"

component  
class="c-panel c-panel--service"

text  
class="c-kicker"

button  
class="c-button c-button--outline"

---

# 六、Section 設計原則

Section CSS 只負責

layout  
spacing  
background  
grid

Section 不應該定義 component style

正確

.s-services  
.s-booking  
.s-faq

錯誤

.s-services .c-button  
.s-services .c-card

Component style 必須寫在 components.css

---

# 七、Component 設計原則

Component 必須

可重用  
不依賴 section  
不綁定頁面  
不寫 page-specific style

正確

.c-button  
.c-panel  
.c-pill  
.c-list  
.c-featureList  
.c-sectionHead

錯誤

.home-card  
.services-button  
.contact-list

---

# 八、Component Library

模板的核心 component

Buttons

.c-button  
.c-button--primary  
.c-button--ghost  
.c-button--outline  

Panels

.c-panel  
.c-panel--liftSoft  
.c-panel--liftStrong  

Typography

.c-kicker  
.c-lead  
.c-muted  

Lists

.c-list  
.c-featureList  

Layout helpers

.c-sectionHead  
.c-btnRow  

---

# 九、Layout 系統

Layout 由 layout.css 控制

常用 layout

.l-container  
.l-grid  
.l-split  
.l-bookingGrid

container 負責

max width  
padding  
center alignment

---

# 十、Design Tokens

所有設計數值必須來自 tokens

定義於

00-tokens.css

Token 類型

colors  
spacing  
radius  
shadow  
surface  
container width

範例

--color-text  
--color-accent  

--space-xs  
--space-sm  
--space-md  
--space-lg  

--radius  
--shadow-soft  
--shadow-strong  

---

# 十一、Utility Class

Utility class 放在

90-utilities.css

常見 utility

.u-center  
.u-hide  
.u-text-center  
.u-mt-sm  
.u-mt-md  
.u-mt-lg  

Utility 只用於

微調  
一次性調整

不要用 utility 取代 component

---

# 十二、RWD 規則

所有 responsive 規則統一放在

99-responsive.css

不要在 component 檔案中寫 media query

Breakpoints

1200px  
900px  
600px  
480px  

---

# 十三、Partial System

Header / Footer 使用 partial injection

HTML

<div id="site-header"></div>

<main></main>

<div id="site-footer"></div>

由

/assets/js/partials.js

載入

---

# 十四、JavaScript 原則

JS 必須

小型  
模組化  
不依賴 framework

main.js 負責

header menu  
active nav  
UI interaction

partials.js 負責

header injection  
footer injection  
menu init

---

# 十五、Page Scaffold

新頁面應遵循以下結構

Hero

s-hero

Content Sections

s-section

Grid Layout

l-container

CTA

c-panel

Footer

site-footer

---

# 十六、SEO 基礎

每頁必須包含

title  
description  
canonical  
og tags  
twitter tags  
JSON-LD  

---

# 十七、模板品牌替換

新增網站時只需要修改

logo  
brand name  
contact info  
SEO  
content  

核心架構保持不變

---

# 十八、禁止事項

禁止

inline style  
page specific CSS  
修改 component base style  
任意新增 CSS 檔案  

如果需要新樣式

1 優先新增 component  
2 或使用 utility  
3 最後才新增 section style

---

# 十九、模板核心理念

Consistency  
Maintainability  
Reusability  
Scalability

目標是

讓網站在三個專案後仍然保持乾淨