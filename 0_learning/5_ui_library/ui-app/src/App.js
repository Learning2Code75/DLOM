import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import CustomSwitch from "./CustomSwitch";

export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <h1>css1 - view cards(light)</h1>
        <div className="css1Container">
          <div className="css1Card">
            <div className="css1ImgBx">
              <img src="/logo512.png" />
            </div>
            <div className="css1ContentBx">
              <h2>Design</h2>
              <p>
                Neel Choksi Addr GYB DLOM Wed Feb 01 2023 Subscription basic
                basic features 299 month Limits: Client Ops:15 User Ops:15
                Product
                {/* Ops:15 Order Ops:15 Task Ops:15 Wed Feb 01 2023 16:51:47 GMT+0530
              (India Standard Time) 100 paid today via cash cash Sun Feb 05 2023
              13:06:10 GMT+0530 (India Standard Time) 10 desc1 m1 Sun Feb 05
              2023 13:06:10 GMT+0530 (India Standard Time) 50 desc2 m3 Sun Feb
              05 2023 13:11:12 GMT+0530 (India Standard Time) 1 desc3 m4 Sun Feb
              05 2023 13:15:06 GMT+0530 (India Standard Time) 2 dsesc4 m5 total
              Amt Paid:163 */}
              </p>
              <div className="css1Btn">
                <span>Button</span>
              </div>
            </div>
          </div>
        </div>
        <h1>css2 - view cards(dark)</h1>
        <div className="css2Container">
          <div className="css2Card">
            <div className="css2ImgBx">
              <img src="/logo512.png" />
            </div>
            <div className="css2ContentBx">
              <h2>Design</h2>
              <p>
                Neel Choksi Addr GYB DLOM Wed Feb 01 2023 Subscription basic
                basic features 299 month Limits: Client Ops:15 User Ops:15
                Product
                {/* Ops:15 Order Ops:15 Task Ops:15 Wed Feb 01 2023 16:51:47 GMT+0530
              (India Standard Time) 100 paid today via cash cash Sun Feb 05 2023
              13:06:10 GMT+0530 (India Standard Time) 10 desc1 m1 Sun Feb 05
              2023 13:06:10 GMT+0530 (India Standard Time) 50 desc2 m3 Sun Feb
              05 2023 13:11:12 GMT+0530 (India Standard Time) 1 desc3 m4 Sun Feb
              05 2023 13:15:06 GMT+0530 (India Standard Time) 2 dsesc4 m5 total
              Amt Paid:163 */}
              </p>
              <div className="css2Btn">
                <span>Button</span>
              </div>
            </div>
          </div>
        </div>
        <h1>css3 - view card elements (light)</h1>
        <div className="css3Container">
          <div className="css3Grid">
            <div className="css3Logo">
              <div className="css3btnSquare css3morph">DLOM</div>
            </div>

            <div className="css3BtnOff">
              <button className="css3btn css3morph">Button</button>
            </div>

            <div className="css3BtnAct">
              <button className="css3btn css3morph css3active">Pressed</button>
            </div>

            <div className="css3BtnDrop">
              <button className="css3btn css3morph ">
                dropdown <span>{">"}</span>
              </button>
            </div>

            <div className="css3BtnUser">
              <button className="css3btn css3morph ">
                Add user <span>{"&"}</span>
              </button>
            </div>

            <div className="css3BtnI1">
              <button className="css3btnIcon css3morph ">
                <span>{"<"}</span>
              </button>
            </div>

            <div className="css3BtnI2">
              <button className="css3btnIcon css3morph ">
                <span>{">"}</span>
              </button>
            </div>

            <div className="css3BtnR1">
              <button className="css3btnIcon css3btnIconRounded css3morph ">
                <span>{"o"}</span>
              </button>
            </div>

            <div className="css3BtnR2">
              <button className="css3btnIcon css3btnIconRounded css3morph css3active">
                <span>{"."}</span>
              </button>
            </div>

            <div className="css3SwitchO">
              <input type="checkbox" className="ios-checkbox" id="switch-a" />
              <label for="switch-a"></label>
            </div>
            <div className="css3SwitchA">
              <input type="checkbox" className="ios-checkbox" id="switch-a" />
              <label for="switch-o"></label>
            </div>

            <div className="css3BtnSm1">
              <div className="css3btn css3btnSm css3morph">
                Share <span>{"->"}</span>
              </div>
            </div>

            <div className="css3BtnSm2">
              <div className="css3btn css3btnSm css3morph">
                <span>{"-%"}</span> Label
              </div>
            </div>

            <div className="css3Search">
              <div class="css3btn css3morph css3active">
                Search for ...
                <span>{"?"}</span>
              </div>
            </div>
          </div>
        </div>
        <h1>css4 - view card elements (dark)</h1>
        <div className="css4Container">
          <div className="css4Grid">
            <div className="css4BtnOff">
              <button className="css4btn css4morph">Button</button>
            </div>

            <div className="css4BtnAct">
              <button className="css4btn css4morph css4active">Pressed</button>
            </div>
          </div>
        </div>
        <h1>css5 - form ui (light)</h1>
        <div className="css5Container">
          <div className="css5Form">
            <h6>Username</h6>
            <input className="ip" type="text" placeholder="placeholder" />

            <h6>Who are you?</h6>
            <input className="ipR" type="radio" name="job" id="developer" />
            <input className="ipR" type="radio" name="job" id="designer" />
            <h6>Email</h6>
            <input className="ip" type="email" placeholder="email1@gmail.com" />
            <h6>Password</h6>
            <input className="ip" type="password" placeholder="min 6 chars" />
            <a href="" className="submit">
              {" "}
              Submit{" "}
            </a>

            <button className="btn1">Highlight</button>

            <button className="btn2">Submit</button>
          </div>
        </div>
        <h1>css6 - form ui (dark)</h1>
        <div className="css6Container">
          <div className="css6Form">
            <h6>Username</h6>
            <input className="ip" type="text" placeholder="placeholder" />

            <h6>Who are you?</h6>
            <input className="ipR" type="radio" name="job" id="developer" />
            <input className="ipR" type="radio" name="job" id="designer" />
            <h6>Email</h6>
            <input className="ip" type="email" placeholder="email1@gmail.com" />
            <h6>Password</h6>
            <input className="ip" type="password" placeholder="min 6 chars" />
            <a href="" className="submit">
              {" "}
              Submit{" "}
            </a>

            <button className="btn1">Highlight</button>

            <button className="btn2">Submit</button>
          </div>
        </div>
        <h1>css7 - route cards (light)</h1>
        <div className="css7Container">
          <div className="css7Card">
            <div className="css7Box">
              <div className="css7Content">
                <h2>01</h2>
                <h3>Card One</h3>
                <p>
                  Neel Choksi Addr GYB DLOM Wed Feb 01 2023 Subscription basic
                  basic features 299 month Limits: Client Ops:15 User Ops:15
                  Product
                </p>
                <a href="#">Read more</a>
              </div>
            </div>
          </div>
          <div className="css7Card">
            <div className="css7Box">
              <div className="css7Content">
                <h2>02</h2>
                <h3>Card Two</h3>
                <p>
                  Neel Choksi Addr GYB DLOM Wed Feb 01 2023 Subscription basic
                  basic features 299 month Limits: Client Ops:15 User Ops:15
                  Product
                </p>
                <a href="#">Read more</a>
              </div>
            </div>
          </div>
          <div className="css7Card">
            <div className="css7Box">
              <div className="css7Content">
                <h2>03</h2>
                <h3>Card Three</h3>
                <p>
                  Neel Choksi Addr GYB DLOM Wed Feb 01 2023 Subscription basic
                  basic features 299 month Limits: Client Ops:15 User Ops:15
                  Product
                </p>
                <a href="#">Read more</a>
              </div>
            </div>
          </div>
        </div>
        <h1>css8 - route cards (dark)</h1>
        <div>take from created app</div>

        <h1>Light mode , dark mode toggle </h1>
        <div className="ldContainer">
          <div className="main">
            <p className="sign" align="center">
              Sign in
            </p>
            <form className="form1">
              <input className="username" type="text" placeholder="Username" />
              <input
                className="password"
                type="password"
                placeholder="Password"
              />
              <a className="submit" align="center">
                Sign in
              </a>
              <p className="forgot" align="center">
                <a href="#">Forgot Password? </a>
              </p>
            </form>
            <CustomSwitch />
          </div>
        </div>

        <h1>css9 - Basic grid</h1>
        <div className="css9BasicGrid">
          <div className="css9Card">1</div>
          <div className="css9Card">2</div>
          <div className="css9Card">3</div>
          <div className="css9Card">4</div>
          <div className="css9Card">5</div>
          <div className="css9Card">6</div>
          <div className="css9Card">7</div>
          <div className="css9Card">8</div>
          <div className="css9Card">9</div>
          <div className="css9Card">10</div>
          <div className="css9Card">11</div>
          <div className="css9Card">12</div>
        </div>
        <h1>css10 - Photo grid</h1>
        <div className="css10PhotoGrid">
          <div className="css10Card css10CardTall">1</div>
          <div className="css10Card">2</div>
          <div className="css10Card">3</div>
          <div className="css10Card">4</div>
          <div className="css10Card css10CardWide">5</div>
          <div className="css10Card">6</div>
          <div className="css10Card">7</div>
          <div className="css10Card">8</div>
          <div className="css10Card">9</div>
          <div className="css10Card">10</div>
          <div className="css10Card css10CardWide ">11</div>
          <div className="css10Card">12</div>
        </div>

        <h1>css11 - Animated grid</h1>
        <div className="css11AnimatedGrid">
          <div className="css11Card">a</div>
          <div className="css11Card">b</div>
          <div className="css11Card">c</div>
          <div className="css11Card">d</div>
          <div className="css11Card">e</div>
          <div className="css11Card">f</div>
          <div className="css11Card">g</div>
          <div className="css11Card">h</div>
          <div className="css11Card">i</div>
          <div className="css11Card">j</div>
          <div className="css11Card">k</div>
          <div className="css11Card">l</div>
          <div className="css11Card">main</div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
