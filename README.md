# football-clubs-web-api

### JSON webAPI following **[Robert C. Martin's "Clean Architecture" Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)**

![](./CleanArchitecture.jpg)

### If one layer needs to communicate to a higher one, it will be doing it by **[Dependency Injection](http://stg-tud.github.io/sedc/Lecture/ws13-14/3.5-DIP.html#mode=document)** (Manually in this case, we can implement DIContainer in the future)

---

**HIGHER LAYERS** => can directly depend on => **LOWER LAYERS**

**LOWER LAYERS** => can only depend via injection of => **HIGER LAYERS**

The hierarchy goes from the most important layer (Business Entities) to the least important ones (Interfaces and implementation details)

### Entity > Service > Controller > Web Interface (Express Framework) / DB Repository (Sequelize Framework)
