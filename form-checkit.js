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

		this.fields.text = textFields
		this.fields.textarea = textareaFields
		this.fields.select = selectFields

		textFields?.forEach(field => { this.watchForChanges(field) })
		textareaFields?.forEach(field => { this.watchForChanges(field) })
		selectFields?.forEach(field => { this.watchForChanges(field) })
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
			if (field.value === 'default') {
				field.classList.add('is-invalid')
				valid = false
			}
			else {
				field.classList.remove('is-invalid')
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
