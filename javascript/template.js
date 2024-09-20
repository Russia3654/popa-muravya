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
            <a href="/popa-muravya/index.html">Home</a>
          </li>

          <li>
            <a href="/popa-muravya/public/about.html" id="about-link">About</a>
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
          </li>

          <li>
            <a href="/popa-muravya/public/quiz.html">Quiz</a>
          </li>
          
        </nav>
      </div>
    </header>
    `
  }
}

customElements.define('custom-header', MyHeader)