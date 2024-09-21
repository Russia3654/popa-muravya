/// custom header
class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="cust-head">
      <div class="left-head">
        <div class="logo">
          <img src="/popa-muravya/assets/image/rusteck-logo.png" alt="RusTeck logo" class="logo-image">
        </div>
      </div>
      <div class="right-head">
        <input type="checkbox" id="checkbox">

        <label for="checkbox" class="toggle">
          <div class="bars" id="bar1"></div>
          <div class="bars" id="bar2"></div>
          <div class="bars" id="bar3"></div>
        </label>

        <nav class="navbar">
          <li>
            <section>
              <div class="button v18">
                <a href="/popa-muravya/index.html" class="label">Home</a>
                <span class="icon">
                    <span></span>
                </span>
                <span class="icon2">
                </span>
              </div>
            </section>
          </li>

          <li>
            <section>
              <div class="button v18 about-link">
                <a href="/popa-muravya/public/about.html" class="label" >about</a>
                <span class="icon">
                    <span></span>
                </span>
                <span class="icon2">
                </span>
              </div>
            
            <nav class="dropdown-about">
              <li>
                <a href="/popa-muravya/public/schedule.html">Schedule</a>
              </li>
              <li>
                <a href="/popa-muravya/public/projects.html">Projects</a>
              </li>
              <li>
                <a href="/popa-muravya/public/contact.html">Contacts</a>
              </li>
            </nav>
            </section>
          </li>

          <li>
            <section>
              <div class="button v18">
                <a href="/popa-muravya/public/quiz.html" class="label">Quiz</a>
                <span class="icon">
                    <span></span>
                </span>
                <span class="icon2">
                </span>
              </div>
            </section>
          </li>
          
        </nav>
      </div>
    </header>
    `
  }
}

customElements.define('custom-header', MyHeader)