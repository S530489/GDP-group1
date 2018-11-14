var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
By = webdriver.By;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

driver.get('http://127.0.0.1:8081/createaccount');

driver.sleep(5000);

// Checking whether the page opened has the correct title or not
driver.sleep(2000).then(function() {
  driver.getTitle().then(function(title) {
    if(title === 'Costume Designing') {
      console.log('Matched the title - Test passed');
    } else {
      console.log('Test failed');
    }
    driver.quit();
  });
});

var element = driver.findElement(By.xpath ("//*[@id='new_emailid']"));
element.sendKeys('Filling in my form');
//*[@id="new_emailid"]


