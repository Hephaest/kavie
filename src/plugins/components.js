import BaseAlert from '@/components/ui/Alert.vue';
import BaseModal from '@/components/ui/Modal.vue';
import BaseIcon from '@/components/ui/Icon.vue';
import BaseCard from '@/components/layout/Card.vue';
import BaseBorder from '@/components/layout/Border.vue';
import BaseHeadline from '@/components/layout/Headline.vue';
import BaseSpinner from '@/components/ui/Spinner.vue';
import BaseButton from '@/components/ui/Button.vue';
import VeeInput from '@/components/ui/vees/VeeInput.vue';
import VeeSelect from '@/components/ui/vees/VeeSelect.vue';
import BaseUploadForm from '@/components/ui/forms/UploadForm.vue';
import FileProgressBar from '@/components/ui/progress-bars/FileBar.vue';
import NotFoundCard from '@/components/ui/cards/NotFoundCard.vue';

export default {
  install(app) {
    app.component('base-alert', BaseAlert);
    app.component('base-modal', BaseModal);
    app.component('base-icon', BaseIcon);
    app.component('base-card', BaseCard);
    app.component('not-found-card', NotFoundCard);
    app.component('base-border', BaseBorder);
    app.component('base-headline', BaseHeadline);
    app.component('base-spinner', BaseSpinner);
    app.component('base-button', BaseButton);
    app.component('vee-input', VeeInput);
    app.component('vee-select', VeeSelect);
    app.component('base-upload-form', BaseUploadForm);
    app.component('file-progress-bar', FileProgressBar);
  },
};
