---
spec_id: admin/avocation_systems-mx_0808nad_r
schema_version: ai4av-public-spec-v1
revision: 1
title: "Avocation Systems MX-0808NAD/R Control Spec"
manufacturer: "Avocation Systems"
model_family: MX-0808NAD/R
aliases: []
compatible_with:
  manufacturers:
    - "Avocation Systems"
  models:
    - MX-0808NAD/R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-16X16-NAD_Manual.pdf
retrieved_at: 2026-05-19T22:52:51.750Z
last_checked_at: 2026-06-15T14:08:05.949Z
generated_at: 2026-06-15T14:08:05.949Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - MXxxZ29xxyyiioo
  - MXxxZ30xxyy
  - MXxxZ31xxyy
  - MXxxZ32xxyyiioo
  - MXxxZ33xxyy
  - MXxxZ34xxyy
  - "infrared control not documented beyond mention"
  - "flow control not stated in source"
  - "no discrete settable parameters not tied to actions in source"
  - "no unsolicited notifications documented"
  - "no multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version not stated in source"
  - "RS-485 pinout not documented"
  - "infrared command protocol not documented"
verification:
  verdict: verified
  checked_at: 2026-06-15T14:08:05.949Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched verbatim in source; transport parameters confirmed; coverage 92% (70/76 commands) exceeds 0.9 threshold. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Avocation Systems MX-0808NAD/R Control Spec

## Summary
Avocation Systems MX-0808NAD/R matrix switcher supporting audio, video, and digital routing. Controlled via RS-232C (default) or RS-485. Supports up to 64 inputs and 64 outputs. Unit ID 00–15. All commands terminated with `<CR>`. No authentication required.

<!-- UNRESOLVED: infrared control not documented beyond mention -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # audio, video, digital, A/V routing commands present
- queryable      # status query commands present
- levelable      # volume, sensitivity, balance control present
```

## Actions
```yaml
- id: audio_route_single
  label: Route Audio Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
      description: Unit ID (00-15)
    - name: input
      type: integer
      description: Audio input number (00-64)
    - name: output
      type: integer
      description: Audio output number (01-64)

- id: audio_route_multiple
  label: Route Audio Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: array
      description: Up to 10 output numbers (01-64)

- id: audio_route_all
  label: Route Audio Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: audio_balance_set
  label: Set Audio Output Balance
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: balance
      type: integer
      description: "00=full left, 49=center, 99=full right"

- id: audio_output_off
  label: Audio Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: state
      type: integer
      description: "0=unmute, 1=mute, omit=toggle"

- id: audio_sensitivity_set
  label: Set Audio Input Sensitivity
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: level
      type: integer
      description: "00-48, 32=0dB pass, 0.5dB steps"

- id: audio_sensitivity_all
  label: Set All Audio Inputs Sensitivity
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: level
      type: integer

- id: audio_volume_set
  label: Set Audio Output Volume
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: level
      type: integer
      description: "00=−64dB min, 32=0dB pass, 48=+32dB max"

- id: audio_volume_all
  label: Set All Audio Outputs Volume
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: level
      type: integer

- id: audio_volume_step_up
  label: Audio Volume Step Up
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: audio_volume_step_down
  label: Audio Volume Step Down
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: video_route_single
  label: Route Video Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: video_route_multiple
  label: Route Video Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: array

- id: video_route_all
  label: Route Video Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: video_output_off
  label: Video Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: digital_route_single
  label: Route Digital Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: digital_route_multiple
  label: Route Digital Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: array

- id: digital_route_all
  label: Route Digital Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: digital_output_off
  label: Digital Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: av_route_single
  label: Route A/V Input to Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: av_route_multiple
  label: Route A/V Input to Multiple Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer
    - name: outputs
      type: array

- id: av_route_all
  label: Route A/V Input to All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: input
      type: integer

- id: av_output_off
  label: A/V Output Off
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer

- id: max_volume_set
  label: Set Maximum Volume Level for Output
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
    - name: level
      type: integer
      description: "00-48"

- id: volume_control_enable
  label: Enable/Disable Volume Control
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: state
      type: integer
      description: "0=disable, 1=enable"

- id: sensitivity_control_enable
  label: Enable/Disable Sensitivity Control
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: state
      type: integer
      description: "0=disable, 1=enable"

- id: digital_with_analog_select
  label: Set/Read Digital with Analog Selection
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: state
      type: integer
      description: "0=disconnect, 1=switch with analog, omit=read current"

- id: digital_with_video_select
  label: Set/Read Digital with Video Selection
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: state
      type: integer
      description: "0=disconnect, 1=switch with video, omit=read current"

- id: preset_save
  label: Save Current Setup as Preset
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer
      description: "Preset number 01-99"

- id: preset_load
  label: Load Preset
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer

- id: factory_reset
  label: Factory Reset All
  kind: action
  params:
    - name: unit_id
      type: integer
- id: audio_route_status_query
  label: Query Audio Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
      description: Unit ID (00-15)
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: audio_balance_status_query
  label: Query Audio Balance Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: audio_mute_status_query
  label: Query Audio Mute Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: audio_sensitivity_status_query
  label: Query Audio Input Sensitivity Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: audio_volume_status_query
  label: Query Audio Output Volume Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: video_route_status_query
  label: Query Video Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: digital_route_status_query
  label: Query Digital Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: av_route_status_query
  label: Query A/V Route Status
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: output
      type: integer
      description: Output number (01-64); omit to return all

- id: all_status_query
  label: Query All Status
  kind: query
  params:
    - name: unit_id
      type: integer

- id: audio_balance_all
  label: Set Balance for All Outputs
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: balance
      type: integer
      description: "00=full left, 49=center, 99=full right"

- id: av_straight_through
  label: A/D/V Straight Through
  kind: action
  params:
    - name: unit_id
      type: integer

- id: read_audio_inputs
  label: Read Audio Inputs Count
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_video_inputs
  label: Read Video Inputs Count
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_audio_outputs
  label: Read Audio Outputs Count
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_video_outputs
  label: Read Video Outputs Count
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_option_flags
  label: Read Option Flags
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_model_number
  label: Read Model Number
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_hardware_code
  label: Read Hardware Code
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_hardware_revision
  label: Read Hardware Revision
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_software_revision
  label: Read Software Revision
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_serial_number
  label: Read Serial Number
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_mfg_date
  label: Read Manufacturing Date
  kind: query
  params:
    - name: unit_id
      type: integer

- id: front_panel_control
  label: Set/Read Front Panel Control Enable
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: state
      type: integer
      description: UNRESOLVED

- id: volume_mode
  label: Set/Read Volume Mode
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: mode
      type: integer
      description: UNRESOLVED

- id: mute_release_mode
  label: Set/Read Mute Release Mode
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: mode
      type: integer
      description: UNRESOLVED

- id: response_mode
  label: Set/Read Response Mode
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: mode
      type: integer
      description: UNRESOLVED

- id: read_max_volume_all
  label: Read Maximum Volume Level for All Outputs
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_volume_control_status
  label: Read Volume Control Enable/Disable Status
  kind: query
  params:
    - name: unit_id
      type: integer

- id: read_sensitivity_control_status
  label: Read Sensitivity Control Enable/Disable Status
  kind: query
  params:
    - name: unit_id
      type: integer

- id: ir_teach
  label: Teach IR Code
  kind: action
  params:
    - name: unit_id
      type: integer

- id: ir_repeat_set
  label: Set/Read IR Repeat Count
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: count
      type: integer
      description: Number of times to repeat on IR teaching

- id: preset_name_set
  label: Set Preset Name
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer
      description: Preset number
    - name: name
      type: string

- id: preset_name_read
  label: Read Preset Name
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer

- id: preset_name_clear
  label: Clear Preset Name
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer

- id: preset_read
  label: Read Preset by Number
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer

- id: audio_preset_set
  label: Set Audio Preset
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer
    - name: input
      type: integer
    - name: output
      type: integer

- id: audio_preset_read
  label: Read Audio Preset
  kind: query
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer

- id: audio_preset_clear
  label: Clear Audio Preset
  kind: action
  params:
    - name: unit_id
      type: integer
    - name: preset_num
      type: integer
```

## Feedbacks
```yaml
- id: audio_route_status
  type: string
  description: "Response: MXxx-Audio=ii to oo<CR>"

- id: audio_balance_status
  type: string
  description: "Response: MXxx-Balance oo set to yy<CR>"

- id: audio_mute_status
  type: string
  description: "Response: MX00-Output 01 is Muted<CR>"

- id: audio_sensitivity_status
  type: string
  description: "Response: MXxx-Sensitivity ii set to yy<CR>"

- id: audio_volume_status
  type: string
  description: "Response: MXxx-Volume oo to yy<CR>"

- id: video_route_status
  type: string
  description: "Response: MXxx-Video=ii to oo<CR>"

- id: digital_route_status
  type: string
  description: "Response: MXxx-Digital=ii to oo<CR>"

- id: av_route_status
  type: string
  description: "Response: MXxx-A/V=ii to oo<CR>"

- id: max_volume_status
  type: string
  description: "Response: MXxx-Max Out Level for oo = yy<CR>"

- id: volume_control_status
  type: string
  description: "Response: MXxx-Volume control enabled<CR> or disabled<CR>"

- id: sensitivity_control_status
  type: string
  description: "Response: MXxx-Sensitivity control enabled<CR> or disabled<CR>"

- id: audio_inputs_count
  type: string
  description: "Response: MXxx-Audio inputs = yy<CR>"

- id: video_inputs_count
  type: string
  description: "Response: MXxx-Video inputs = yy<CR>"

- id: audio_outputs_count
  type: string
  description: "Response: MXxx-Audio outputs = yy<CR>"

- id: video_outputs_count
  type: string
  description: "Response: MXxx-Video outputs = yy<CR>"

- id: model_number
  type: string
  description: "Response: MXxx-Model No. = MX-0808NAD/R<CR>"

- id: hardware_code
  type: string
  description: "Response: MXxx-Hardware Code = MTX-1616-B<CR>"

- id: hardware_revision
  type: string
  description: "Response: MXxx-Hardware revision = 1.000<CR>"

- id: software_revision
  type: string
  description: "Response: MXxx-Software revision = 1.000<CR>"

- id: serial_number
  type: string
  description: "Response: MXxx-Serial No. = MTX09B1000<CR>"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters not tied to actions in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
All commands require `<CR>` (carriage return) terminator. Unit ID `xx` ranges 00–15. Input number `ii` ranges 00–64. Output number `oo` ranges 01–64. Multiple outputs specified as comma-separated list (e.g., `01,02,03`). Source confirms model `MX-0808NAD/R` via `Z06` query response. Hardware code `MTX-1616-B` and revision `1.000` also returned by queries. Default baud 19200; configurable to 4800/9600/19200/38400/57600/115200 via front panel.
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: RS-485 pinout not documented -->
<!-- UNRESOLVED: infrared command protocol not documented -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-MX-16X16-NAD_Manual.pdf
retrieved_at: 2026-05-19T22:52:51.750Z
last_checked_at: 2026-06-15T14:08:05.949Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-15T14:08:05.949Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched verbatim in source; transport parameters confirmed; coverage 92% (70/76 commands) exceeds 0.9 threshold. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- MXxxZ29xxyyiioo
- MXxxZ30xxyy
- MXxxZ31xxyy
- MXxxZ32xxyyiioo
- MXxxZ33xxyy
- MXxxZ34xxyy
- "infrared control not documented beyond mention"
- "flow control not stated in source"
- "no discrete settable parameters not tied to actions in source"
- "no unsolicited notifications documented"
- "no multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version not stated in source"
- "RS-485 pinout not documented"
- "infrared command protocol not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
