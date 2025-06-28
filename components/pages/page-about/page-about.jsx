export function PageAbout(){
    return (
        <div className="page-about">
            <h3>Site to share collections of perks and items</h3>
            <h3>Сайт чтобы делится сборками перков</h3>
            <hr/>
            <p>Author: SergoZar</p>
            <p>Donate: ...</p>
            <p>
                Repo. Please put a star(: : <a href="https://github.com/SergoZar/shadowfight3-master">https://github.com/SergoZar/shadowfight3-master</a>
            </p>
            <p>
                Github:<a href="https://github.com/sergozar">https://github.com/sergozar</a>
            </p>
            <p>
                Telegram: <a href="https://t.me/SergoZarOfficiant">https://t.me/SergoZarOfficiant</a>
            </p>
            <p>
                Fediverse(Pleroma): <a href="https://social.net.ua/users/SergoZar">https://social.net.ua/users/SergoZar</a>
            </p>
            <p>
                Reddit: <a href="https://www.reddit.com/user/SergoZar">https://www.reddit.com/user/SergoZar/</a>
            </p>

            <hr/>
            <h3>Планы на будущее</h3>
            <div>
                <ul>
                    <li>Поддержка других языков</li>
                    <li>Техническое описание всех перков чтобы подсчитывать урон, защиту и еще что-то</li>
                    <li><del>Список сетов</del></li>
                    <li>Техническое описание всех сетов чтобы подсчитывать урон, защиту и еще что-то</li>
                    <li><del>Список спецприемов</del></li>
                    <li>Техническое описание всех спецприемов чтобы подсчитывать урон, защиту и еще что-то</li>
                    <li>Вкладка рекомендованых сборок</li>
                    <li>Поддержка смены цвета фона</li>
                    <li>Несколько перков для слота(до 4 перков) чтобы предложить игроку перк на выбор для слота</li>
                    <li>Сортировка по сундукам или способу получения</li>
                </ul>
            </div>
            <h3>Plans for the future</h3>
            <div>
                <ul>
                    <li>Other languages support</li>
                    <li>Technical description of all perks to calculate damage, defense, and more</li>
                    <li><del>List of sets</del></li>
                    <li>Technical description of all sets to calculate damage, defense, and more</li>
                    <li><del>List of special moves</del></li>
                    <li>Technical description of all special moves to calculate damage, defense, and more</li>
                    <li>Tab for recommended builds</li>
                    <li>Support for background color change</li>
                    <li>Multiple perks per slot (up to 4 perks) to offer the player a choice for the slot</li>
                    <li>Sorting by chests or acquisition method</li>
                </ul>
            </div>
            <hr/>
            <h3>Update log:</h3>

            <h4>v0.1.4 (29.07.2025)</h4>
            <div>
                <ul>
                    <li>Добавлены иконки экипировки нового сета</li>
                    <li>Added equipment icons for the new set</li>
                    <li>Добавлены иконки новых перков</li>
                    <li>Added icons for new perks</li>
                  
                    
                </ul>
            </div>
            <h4>v0.1.3 (13.04.2025)</h4>
            <div>
                <ul>
                    <li>Добавлены две таблцицы с инфой о сработавших перках</li>
                    <li>Added two tables with info about triggered perks</li>
                    <li>Добалвена кнопка пересчёта урона</li>
                    <li>Added damage calculation button</li>
                    <li>Добавлена иконка калькулятора к тем перкам чьи бонусы считает калькулятор</li>
                    <li>Added calculator icon to those perks whose bonuses are calculated by the calculator</li>
                    
                </ul>
            </div>
            <h4>v0.1.2 (8.04.2025)</h4>
            <div>
                <ul>
                    <li>Добавлен функционал создания сборки вместе с экипировкой, перками и спецприемами(но пока это не доработано примерно на 80%)</li>
                    <li>Добавлены все предметы экипировки в список всех вещей</li>
                    <li>Added all eqiupment items to the list of all things</li>
                    <li>Добавлена кнопка выбора не доступных вещей, сетов, вещей, без сетов и спецприемов</li>
                    <li>Added button for choosing unavailable items, sets, things without sets and special moves</li>
                    <li>Теперь в списке всех вещей при выборе типа вещей у которых нет выбраного качества 
                        выбор качества бует отменен, а также не доступные качества будут отключены
                    </li>
                    <li>Now in the list of all things when choosing a type of thing who does not have a quality 
                        that was chosen in the previous type of things, the choice of quality items is canceled, 
                        as well as not available qualities will be disabled
                    </li>
                    
                </ul>
            </div>

            <h4>v0.1.1.1 (28.02.2025)</h4>
            <div>
                <ul>
                    <li>Fixed bug with adaptation on phones</li>
                    <li>Исправлен баг с адаптацией под телефоны</li>
                    <li>Changed behavior on the telephone screens</li>
                    <li>Изменено поведение на экранах телефонов</li>
                    <li>Added a modal window with a build  conversion error into a picture</li>
                    <li>Добавлено модальное окно при ошибке конвератции сборки в картинку</li>
                </ul>
            </div>
            
            <h4>v0.1.1.0 (27.02.2025)</h4>
            <div>
                <ul>
                    <li>Add  english language support (by ChatGPT)(auto setup if browser language not is ru or ua)</li>
                    <li>Добавлена поддержка английского(перевод от ChatGPT)(включается автоматически если язык барузера не русский или не украинский)</li>
                    <li>Add checkbox to set transparent background in screenshot</li>
                    <li>Добавлена галочка чтобы сделать прозрачный фон для скрина</li>
                    <li>Low best adaptation for mobile browsers</li>
                    <li>Немеого улучшена адаптация под телефоны</li>
                </ul>
            </div>
            <h4>v0.1.0.0 (26.02.2025)</h4>
            <div>
                <ul>
                    <li>Техническое описание перков(для подсчёта урона): Берсерк,  Кровотечение, Теневой ожог, Сила Химмельштайна, King's Blessing, Ruolan's Arrogance</li>
                    <li>Technical : Berserk,  Bleeding, Shadow Burn, Himmelstein's Power, King's Blessing, Ruolan's Arrogance </li>
                    
                </ul>
            </div>
            
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}