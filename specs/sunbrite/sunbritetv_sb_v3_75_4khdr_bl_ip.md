---
spec_id: admin/sunbritetv-sb-v3-75-4khdr-bl
schema_version: ai4av-public-spec-v1
revision: 1
title: "SunBriteTV SB-V3-75-4KHDR-BL Control Spec"
manufacturer: SunBrite
model_family: SB-V3-75-4KHDR-BL
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - SunBriteTV
  models:
    - SB-V3-75-4KHDR-BL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
  - snapav.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
retrieved_at: 2026-05-26T20:49:57.399Z
last_checked_at: 2026-05-31T22:43:12.555Z
generated_at: 2026-05-31T22:43:12.555Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control capability not confirmed in source; source documents only RS-232 protocol"
  - "no standalone settable parameters documented; all commands are discrete actions"
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
  - "TCP/IP protocol support not confirmed in source despite user-claimed Known protocol"
  - "firmware version compatibility range not stated in source"
  - "error codes and fault behavior not documented in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:43:12.555Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions matched to source commands; transport parameters (9600,8,1,none) confirmed; source fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# SunBriteTV SB-V3-75-4KHDR-BL Control Spec

## Summary
Outdoor television supporting RS-232 control. Serial communication at 9600 baud, 8 data bits, no parity, 1 stop bit. No authentication required. Supports power control, input routing, volume/channel adjustment, picture mode selection, and standard IR remote functions.

<!-- UNRESOLVED: TCP/IP control capability not confirmed in source; source documents only RS-232 protocol -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  params: []
- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: input_10_tuner
  label: Input 10 - Tuner
  kind: action
  params: []
- id: input_1_av
  label: Input 1 - AV
  kind: action
  params: []
- id: input_3_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  params: []
- id: input_4_usb
  label: Input 4 - USB
  kind: action
  params: []
- id: input_5_component1
  label: Input 5 - Component1
  kind: action
  params: []
- id: input_6_component2
  label: Input 6 - Component2
  kind: action
  params: []
- id: input_7_vga
  label: Input 7 - VGA
  kind: action
  params: []
- id: input_8_hdmi1
  label: Input 8 - HDMI1
  kind: action
  params: []
- id: input_9_hdmi2
  label: Input 9 - HDMI2
  kind: action
  params: []
- id: mute
  label: Mute
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: channel_up
  label: Channel Up
  kind: action
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  params: []
- id: digit_1
  label: Digit 1
  kind: action
  params: []
- id: digit_2
  label: Digit 2
  kind: action
  params: []
- id: digit_3
  label: Digit 3
  kind: action
  params: []
- id: digit_4
  label: Digit 4
  kind: action
  params: []
- id: digit_5
  label: Digit 5
  kind: action
  params: []
- id: digit_6
  label: Digit 6
  kind: action
  params: []
- id: digit_7
  label: Digit 7
  kind: action
  params: []
- id: digit_8
  label: Digit 8
  kind: action
  params: []
- id: digit_9
  label: Digit 9
  kind: action
  params: []
- id: digit_0
  label: Digit 0
  kind: action
  params: []
- id: digit_dash
  label: Digit Dash
  kind: action
  params: []
- id: channel_return
  label: Channel Return (Previous Channel)
  kind: action
  params: []
- id: source_toggle
  label: Source Toggle
  kind: action
  params: []
- id: aspect
  label: Aspect
  kind: action
  params: []
- id: enter
  label: Enter
  kind: action
  params: []
- id: info
  label: Info
  kind: action
  params: []
- id: closed_caption
  label: Closed Caption
  kind: action
  params: []
- id: sleep
  label: Sleep
  kind: action
  params: []
- id: picture
  label: Picture
  kind: action
  params: []
- id: sound
  label: Sound
  kind: action
  params: []
- id: menu
  label: Menu
  kind: action
  params: []
- id: arrow_up
  label: Up Arrow
  kind: action
  params: []
- id: arrow_down
  label: Down Arrow
  kind: action
  params: []
- id: arrow_left
  label: Left Arrow
  kind: action
  params: []
- id: arrow_right
  label: Right Arrow
  kind: action
  params: []
- id: picture_mode_personal
  label: Picture Mode 1 - Personal
  kind: action
  params: []
- id: picture_mode_standard
  label: Picture Mode 2 - Standard
  kind: action
  params: []
- id: picture_mode_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []
- id: picture_mode_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: model_class_response
  label: Model Class Response
  type: string
  description: "[B3220AHD-X.XX] or [B4610AHD-X.XX] returned in response to model class query"
- id: firmware_version_response
  label: Firmware Version Response
  type: string
  description: "Main board firmware version string returned in response to firmware query"
- id: power_on_ack
  label: Power On Acknowledgement
  type: string
  values:
    - "[PWRON]"
- id: power_off_ack
  label: Power Off Acknowledgement
  type: string
  values:
    - "[PWROFF]"
- id: power_toggle_ack
  label: Power Toggle Acknowledgement
  type: string
  values:
    - "[PWR]"
- id: mute_ack
  label: Mute Acknowledgement
  type: string
  values:
    - "[MUTE]"
- id: volume_up_ack
  label: Volume Up Acknowledgement
  type: string
  values:
    - "[VOL+]"
- id: volume_down_ack
  label: Volume Down Acknowledgement
  type: string
  values:
    - "[VOL-]"
- id: channel_up_ack
  label: Channel Up Acknowledgement
  type: string
  values:
    - "[CH+]"
- id: channel_down_ack
  label: Channel Down Acknowledgement
  type: string
  values:
    - "[CH-]"
- id: input_10_tuner_ack
  label: Input 10 - Tuner Acknowledgement
  type: string
  values:
    - "[TN1]"
- id: input_1_av_ack
  label: Input 1 - AV Acknowledgement
  type: string
  values:
    - "[AV]"
- id: input_3_hdbaset_ack
  label: Input 3 - HDBaseT Acknowledgement
  type: string
  values:
    - "[HDBaseT]"
- id: input_4_usb_ack
  label: Input 4 - USB Acknowledgement
  type: string
  values:
    - "[USB]"
- id: input_5_component1_ack
  label: Input 5 - Component1 Acknowledgement
  type: string
  values:
    - "[Component 1]"
- id: input_6_component2_ack
  label: Input 6 - Component2 Acknowledgement
  type: string
  values:
    - "[Component2]"
- id: input_7_vga_ack
  label: Input 7 - VGA Acknowledgement
  type: string
  values:
    - "[VGA]"
- id: input_8_hdmi1_ack
  label: Input 8 - HDMI1 Acknowledgement
  type: string
  values:
    - "[HDMI1]"
- id: input_9_hdmi2_ack
  label: Input 9 - HDMI2 Acknowledgement
  type: string
  values:
    - "[HDMI2]"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented; all commands are discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are documented as out of letter sequence to remain compatible with legacy SunBrite RS-232 command sets. Input 2 is listed as N/A (not applicable). Source title "RS 232 Control codes SunbriteTV Rev. 10/07/2016" confirms serial-only control; TCP/IP control not addressed in this document.
<!-- UNRESOLVED: TCP/IP protocol support not confirmed in source despite user-claimed Known protocol -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: error codes and fault behavior not documented in source -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
  - snapav.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
retrieved_at: 2026-05-26T20:49:57.399Z
last_checked_at: 2026-05-31T22:43:12.555Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:43:12.555Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions matched to source commands; transport parameters (9600,8,1,none) confirmed; source fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control capability not confirmed in source; source documents only RS-232 protocol"
- "no standalone settable parameters documented; all commands are discrete actions"
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
- "TCP/IP protocol support not confirmed in source despite user-claimed Known protocol"
- "firmware version compatibility range not stated in source"
- "error codes and fault behavior not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
