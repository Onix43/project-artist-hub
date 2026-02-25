import sprite from '../../../assets/icons/symbol-defs.svg';

export function createFilterError() {
  return `
        <div class="empty-artists">
            <svg class="empty-artists-icon" width="40" height="40">
                <use href="${sprite}#alert"></use>
            </svg>
            <h2 class="empty-artists-title">Silence on the stage…</h2>
            <p class="empty-artists-descr">
                Looks like no artists match your filters. <br />Try changing them or
                hit “Reset Filters” to bring back the beat.
            </p>
            <button class="empty-artists-btn btn-primary" type="button">
                Reset filters
            </button>
        </div>
    
    `;
}
