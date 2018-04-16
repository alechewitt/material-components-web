/**
  * @license
  * Copyright 2018 Google Inc. All Rights Reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License")
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *      http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

import MDCComponent from '@material/base/component';

import MDCTabScrollerAdapter from './adapter';
import MDCTabScrollerFoundation from './foundation';
import MDCTabScrollingFoundation from './scrolling-foundation';
import MDCTabPagingFoundation from './paging-foundation';

/**
 * @extends {MDCComponent<!MDCTabScrollerFoundation>}
 * @final
 */
class MDCTabScroller extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCTabScroller}
   */
  static attachTo(root) {
    return new MDCTabScroller(root);
  }

  constructor(...args) {
    super(...args);

    /** @type {?Element} */
    this.content_;
  }

  initialize() {
    this.content_ = this.root_.querySelector(MDCTabScrollerFoundation.strings.CONTENT_SELECTOR);
  }

  /**
   * @return {!MDCTabScrollerFoundation}
   */
  getDefaultFoundation() {
    const adapter = /** @type {!MDCTabScrollerAdapter} */ ({
      registerEventHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterEventHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setContentStyleProperty: (prop, value) => this.content_.style.setProperty(prop, value),
      getContentStyleValue: (propName) => window.getComputedStyle(this.content_).getPropertyValue(propName),
      setScrollLeft: (scrollX) => this.root_.scrollLeft = scrollX,
      getScrollLeft: () => this.root_.scrollLeft,
      computeContentClientRect: () => this.content_.getBoundingClientRect(),
      computeClientRect: () => this.root_.getBoundingClientRect(),
    });

    if (this.root_.classList.contains(MDCTabScrollerFoundation.cssClasses.PAGING)) {
      return new MDCTabPagingFoundation(adapter);
    }

    // Default to the scrolling foundation
    return new MDCTabScrollingFoundation(adapter);
  }

  /**
   * Scrolls to the given pixel position
   * @param {number} scrollX The pixel value to scroll to
   */
  scrollTo(scrollX) {
    this.foundation_.scrollTo(scrollX);
  }
}

export {MDCTabScroller, MDCTabScrollerFoundation};