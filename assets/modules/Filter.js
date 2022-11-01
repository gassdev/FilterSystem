import { Flipper } from 'flip-toolkit'
export default class Filter{

    /**
     * @type {HTMLElement}
     */
    #pagination
    /**
     * @type {HTMLElement}
     */
    #content
    /**
     * @type {HTMLElement}
     */
    #sorting
    /**
     * @type {HTMLFormElement}
     */
    #form


    /**
     * @param  {HTMLElement|null} element
     */
    constructor(element) {
        if (element === null) {
            return
        }
        this.#pagination = element.querySelector('.js-filter-pagination')
        this.#content = element.querySelector('.js-filter-content')
        this.#sorting = element.querySelector('.js-filter-sorting')
        this.#form = element.querySelector('.js-filter-form')
        this.#bindEvents()
    }
    /**
     * Ajoute les comportements aux différents éléments
     */
    #bindEvents(){
        const aClickListener = e => {
            if (e.target.tagName === 'A') {
                e.preventDefault()
                this.#loadUrl(e.target.getAttribute('href'))
            }
        }
        this.#sorting.addEventListener('click', aClickListener)
        this.#pagination.addEventListener("click", aClickListener)
        this.#form.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', this.#loadForm.bind(this))
        })
    }

    async #loadForm() {
        const data = new FormData(this.#form)
        const url = new URL(this.#form.getAttribute('action') || window.location.href)
        const params = new URLSearchParams()
        data.forEach((value, key) => {
            params.append(key, value)
        })
        return this.#loadUrl(`${url.pathname}?${params.toString()}`)
    }

    async #loadUrl (url){
        const ajaxUrl = `${url}&ajax=1`
        const response = await fetch(ajaxUrl, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json()
            this.#flipContent(data.content)
            this.#sorting.innerHTML = data.sorting
            this.#pagination.innerHTML = data.pagination
            history.replaceState({}, '', url)
        }else{
            console.error(response)
        }
    }

    
    /**
     * Remplace les éléments de la grille avec un effet d'animation flip
     * @param  {string} content
     */
    #flipContent (content) {
        const flipper = new Flipper({
            element: this.#content
        })
        Array.from(this.#content.children).forEach((element) => {
            flipper.addFlipped({
                element,
                flipId: element.id,
                shouldFlip: false,
                onExit: (element, index, remove) => {
                    window.setTimeout(() => {
                        remove()
                    },2000)
                }
            })
        })
        flipper.recordBeforeUpdate()
        this.#content.innerHTML = content
        Array.from(this.#content.children).forEach((element) => {
            flipper.addFlipped({
                element,
                flipId: element.id
            })
        })
        flipper.update()
    }

}