import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMacAddress]'
})
export class MacAddressDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase().replace(/[^0-9A-F]/g, '');
    
    // Apply MAC address format (XX:XX:XX:XX:XX:XX)
    if (value.length > 2) value = value.match(/.{1,2}/g)!.join(':');

    // Limit input to 17 characters (length of MAC address with colons)
    if (value.length > 17) value = value.substr(0, 17);

    input.value = value;
  }

}
