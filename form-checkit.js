class FormCheckIt {
	constructor (element, options = {}) {
		if (!element) return
		this.form = element
		this.options = options
		this.fields = {}

		this.listOptions()
		this.listRequiredFields()
	}

	listOptions () {
		if (this.options.submitDisabled) this.disableSubmit()
	}

	listRequiredFields () {
		const textFields = this.form.querySelectorAll('input[required]:where([type="text"],[type="email"],[type="password"],[type="date"],[type="tel"])')
		const textareaFields = this.form.querySelectorAll('textarea[required]')
		const selectFields = this.form.querySelectorAll('select[required]')
		const checkboxFields = this.form.querySelectorAll('input[required]:where([type="checkbox"],[type="radio"])')
		const groupFields = this.form.querySelectorAll('[data-js-checkboxes="required"]')

		this.fields.text = textFields
		this.fields.textarea = textareaFields
		this.fields.select = selectFields
		this.fields.checkbox = checkboxFields
		this.fields.group = []

		textFields?.forEach(field => { this.watchForChanges(field) })
		textareaFields?.forEach(field => { this.watchForChanges(field) })
		selectFields?.forEach(field => { this.watchForChanges(field) })
		checkboxFields?.forEach(field => { this.watchForChanges(field) })
		groupFields?.forEach((group, index) => {
			this.fields.group.push(group.querySelectorAll('input[type="checkbox"],input[type="radio"]'))
			this.fields.group[index].forEach(field => { this.watchForChanges(field) })
		})
	}

	watchForChanges (field) {
		field.addEventListener('change', () => { this.checkValidation() })
	}

	checkValidation () {
		let valid = true
		Array.from(this.fields.text)?.forEach(field => {
			if (!field.value) {
				field.classList.add('is-invalid')
				valid = false
			}
			else {
				field.classList.remove('is-invalid')
			}
		})

		Array.from(this.fields.textarea)?.forEach(field => {
			if (!field.value) {
				field.classList.add('is-invalid')
				valid = false
			}
			else {
				field.classList.remove('is-invalid')
			}
		})

		Array.from(this.fields.select)?.forEach(field => {
			if (field.value === '') {
				field.classList.add('is-invalid')
				valid = false
			}
			else {
				field.classList.remove('is-invalid')
			}
		})

		Array.from(this.fields.group)?.forEach(group => {
			let count = 0
			group.forEach(field => {
				if (field.checked) count++
			})
			if (count < 1) {
				valid = false
			}
		})

		if (this.options.submitDisabled) {
			valid ? this.enableSubmit() : this.disableSubmit()
		}
	}

	disableSubmit () {
		this.submitButton = this.form.querySelector('[type="submit"]')
		this.submitButton.setAttribute('disabled', '')
	}

	enableSubmit () {
		this.submitButton.removeAttribute('disabled')
	}
}
