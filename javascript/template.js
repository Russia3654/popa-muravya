/// custom header
class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="cust-head">
      <div class="left-head">
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
                <a href="/popa-muravya/index.html" class="label b-button">Home</a>
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
                <a href="/popa-muravya/public/about.html" class="label b-button" >about</a>
                <span class="icon">
                    <span></span>
                </span>
                <span class="icon2">
                </span>
              </div>
            
            <nav class="dropdown-about">
              <li>
                <a href="/popa-muravya/public/schedule.html" class="b-button">Schedule</a>
              </li>
              <li>
                <a href="/popa-muravya/public/projects.html" class="b-button">Projects</a>
              </li>
              <li>
                <a href="/popa-muravya/public/contact.html" class="b-button">Contacts</a>
              </li>
            </nav>
            </section>
          </li>

          <li>
            <section>
              <div class="button v18">
                <a href="/popa-muravya/public/quiz.html" class="label b-button">Quiz</a>
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
      
      <div class="right-head">
          <section>
              <div class="button v18">
                <a href="/popa-muravya/public/quiz.html" class="label m-button">Rus</a>
                <span class="icon">
                    <span></span>
                </span>
                <span class="icon2">
                </span>
              </div>
            </section>
            <section>
              <div class="button v18">
                <a href="/popa-muravya/public/quiz.html" class="label m-button">Eng</a>
                <span class="icon">
                    <span></span>
                </span>
                <span class="icon2">
                </span>
              </div>
            </section>
      </div>
    </header>
    `
  }
}

customElements.define('custom-header', MyHeader)