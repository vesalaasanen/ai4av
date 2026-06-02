---
spec_id: admin/atlona-at-hd88m-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HD88M-SR Control Spec"
manufacturer: Atlona
model_family: AT-HD88M-SR
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HD88M-SR
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HD88M-SR.pdf
  - https://www.manualslib.com/manual/450626/Atlona-At-Hd88m-Sr.html
retrieved_at: 2026-05-19T19:17:09.663Z
last_checked_at: 2026-05-20T04:51:27.573Z
generated_at: 2026-05-20T04:51:27.573Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "response format for queries not documented"
  - "command termination character (CR/LF) not stated"
  - "device ID addressing via serial not fully documented"
  - "flow control not stated in source"
  - "response format/values for ST and VR not documented in source"
  - "no settable parameters (beyond routing and IR code) documented"
  - "no multi-step sequences documented in source"
  - "system lock feature exists (locks RS-232/USB/IR control) but"
  - "command termination character (CR, LF, both?) not stated"
  - "response format and content for ST and VR queries not documented"
  - "device ID setting/getting via serial command format not documented"
  - "whether routing commands produce acknowledgement response not stated"
verification:
  verdict: verified
  checked_at: 2026-05-20T04:51:27.573Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions (64 routing commands, 2 query commands, 3 IR custom codes) found verbatim in source command table; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Atlona AT-HD88M-SR Control Spec

## Summary
8×8 HDMI matrix switcher with RS-232 and USB serial control. Supports routing any of 8 HDMI inputs to any of 8 HDMI outputs via two-character ASCII commands. Also supports IR remote control with multiple custom code sets.

<!-- UNRESOLVED: response format for queries not documented -->
<!-- UNRESOLVED: command termination character (CR/LF) not stated -->
<!-- UNRESOLVED: device ID addressing via serial not fully documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # 64 matrix routing commands (output→input)
- queryable   # ST (system status), VR (firmware version) query commands
```

## Actions
```yaml
- id: route_output_a_input_1
  label: Route Output A Input 1
  kind: action
  command: A1
  params: []

- id: route_output_a_input_2
  label: Route Output A Input 2
  kind: action
  command: A2
  params: []

- id: route_output_a_input_3
  label: Route Output A Input 3
  kind: action
  command: A3
  params: []

- id: route_output_a_input_4
  label: Route Output A Input 4
  kind: action
  command: A4
  params: []

- id: route_output_a_input_5
  label: Route Output A Input 5
  kind: action
  command: A5
  params: []

- id: route_output_a_input_6
  label: Route Output A Input 6
  kind: action
  command: A6
  params: []

- id: route_output_a_input_7
  label: Route Output A Input 7
  kind: action
  command: A7
  params: []

- id: route_output_a_input_8
  label: Route Output A Input 8
  kind: action
  command: A8
  params: []

- id: route_output_b_input_1
  label: Route Output B Input 1
  kind: action
  command: B1
  params: []

- id: route_output_b_input_2
  label: Route Output B Input 2
  kind: action
  command: B2
  params: []

- id: route_output_b_input_3
  label: Route Output B Input 3
  kind: action
  command: B3
  params: []

- id: route_output_b_input_4
  label: Route Output B Input 4
  kind: action
  command: B4
  params: []

- id: route_output_b_input_5
  label: Route Output B Input 5
  kind: action
  command: B5
  params: []

- id: route_output_b_input_6
  label: Route Output B Input 6
  kind: action
  command: B6
  params: []

- id: route_output_b_input_7
  label: Route Output B Input 7
  kind: action
  command: B7
  params: []

- id: route_output_b_input_8
  label: Route Output B Input 8
  kind: action
  command: B8
  params: []

- id: route_output_c_input_1
  label: Route Output C Input 1
  kind: action
  command: C1
  params: []

- id: route_output_c_input_2
  label: Route Output C Input 2
  kind: action
  command: C2
  params: []

- id: route_output_c_input_3
  label: Route Output C Input 3
  kind: action
  command: C3
  params: []

- id: route_output_c_input_4
  label: Route Output C Input 4
  kind: action
  command: C4
  params: []

- id: route_output_c_input_5
  label: Route Output C Input 5
  kind: action
  command: C5
  params: []

- id: route_output_c_input_6
  label: Route Output C Input 6
  kind: action
  command: C6
  params: []

- id: route_output_c_input_7
  label: Route Output C Input 7
  kind: action
  command: C7
  params: []

- id: route_output_c_input_8
  label: Route Output C Input 8
  kind: action
  command: C8
  params: []

- id: route_output_d_input_1
  label: Route Output D Input 1
  kind: action
  command: D1
  params: []

- id: route_output_d_input_2
  label: Route Output D Input 2
  kind: action
  command: D2
  params: []

- id: route_output_d_input_3
  label: Route Output D Input 3
  kind: action
  command: D3
  params: []

- id: route_output_d_input_4
  label: Route Output D Input 4
  kind: action
  command: D4
  params: []

- id: route_output_d_input_5
  label: Route Output D Input 5
  kind: action
  command: D5
  params: []

- id: route_output_d_input_6
  label: Route Output D Input 6
  kind: action
  command: D6
  params: []

- id: route_output_d_input_7
  label: Route Output D Input 7
  kind: action
  command: D7
  params: []

- id: route_output_d_input_8
  label: Route Output D Input 8
  kind: action
  command: D8
  params: []

- id: route_output_e_input_1
  label: Route Output E Input 1
  kind: action
  command: E1
  params: []

- id: route_output_e_input_2
  label: Route Output E Input 2
  kind: action
  command: E2
  params: []

- id: route_output_e_input_3
  label: Route Output E Input 3
  kind: action
  command: E3
  params: []

- id: route_output_e_input_4
  label: Route Output E Input 4
  kind: action
  command: E4
  params: []

- id: route_output_e_input_5
  label: Route Output E Input 5
  kind: action
  command: E5
  params: []

- id: route_output_e_input_6
  label: Route Output E Input 6
  kind: action
  command: E6
  params: []

- id: route_output_e_input_7
  label: Route Output E Input 7
  kind: action
  command: E7
  params: []

- id: route_output_e_input_8
  label: Route Output E Input 8
  kind: action
  command: E8
  params: []

- id: route_output_f_input_1
  label: Route Output F Input 1
  kind: action
  command: F1
  params: []

- id: route_output_f_input_2
  label: Route Output F Input 2
  kind: action
  command: F2
  params: []

- id: route_output_f_input_3
  label: Route Output F Input 3
  kind: action
  command: F3
  params: []

- id: route_output_f_input_4
  label: Route Output F Input 4
  kind: action
  command: F4
  params: []

- id: route_output_f_input_5
  label: Route Output F Input 5
  kind: action
  command: F5
  params: []

- id: route_output_f_input_6
  label: Route Output F Input 6
  kind: action
  command: F6
  params: []

- id: route_output_f_input_7
  label: Route Output F Input 7
  kind: action
  command: F7
  params: []

- id: route_output_f_input_8
  label: Route Output F Input 8
  kind: action
  command: F8
  params: []

- id: route_output_g_input_1
  label: Route Output G Input 1
  kind: action
  command: G1
  params: []

- id: route_output_g_input_2
  label: Route Output G Input 2
  kind: action
  command: G2
  params: []

- id: route_output_g_input_3
  label: Route Output G Input 3
  kind: action
  command: G3
  params: []

- id: route_output_g_input_4
  label: Route Output G Input 4
  kind: action
  command: G4
  params: []

- id: route_output_g_input_5
  label: Route Output G Input 5
  kind: action
  command: G5
  params: []

- id: route_output_g_input_6
  label: Route Output G Input 6
  kind: action
  command: G6
  params: []

- id: route_output_g_input_7
  label: Route Output G Input 7
  kind: action
  command: G7
  params: []

- id: route_output_g_input_8
  label: Route Output G Input 8
  kind: action
  command: G8
  params: []

- id: route_output_h_input_1
  label: Route Output H Input 1
  kind: action
  command: H1
  params: []

- id: route_output_h_input_2
  label: Route Output H Input 2
  kind: action
  command: H2
  params: []

- id: route_output_h_input_3
  label: Route Output H Input 3
  kind: action
  command: H3
  params: []

- id: route_output_h_input_4
  label: Route Output H Input 4
  kind: action
  command: H4
  params: []

- id: route_output_h_input_5
  label: Route Output H Input 5
  kind: action
  command: H5
  params: []

- id: route_output_h_input_6
  label: Route Output H Input 6
  kind: action
  command: H6
  params: []

- id: route_output_h_input_7
  label: Route Output H Input 7
  kind: action
  command: H7
  params: []

- id: route_output_h_input_8
  label: Route Output H Input 8
  kind: action
  command: H8
  params: []

- id: set_ir_code_2
  label: Set IR Custom Code 2
  kind: action
  command: IR2
  description: Set IR custom code to 0x00 0xFF
  params: []

- id: set_ir_code_3
  label: Set IR Custom Code 3
  kind: action
  command: IR3
  description: Set IR custom code to 0x12 0x21
  params: []

- id: set_ir_code_4
  label: Set IR Custom Code 4
  kind: action
  command: IR4
  description: Set IR custom code to 0x13 0x31
  params: []
```

## Feedbacks
```yaml
- id: system_status
  type: string
  description: System status query
  command: ST

- id: firmware_version
  type: string
  description: Firmware version query
  command: VR

# UNRESOLVED: response format/values for ST and VR not documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters (beyond routing and IR code) documented
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: system lock feature exists (locks RS-232/USB/IR control) but
# lock/unlock is via front-panel button only, not serial command. No power
# sequencing requirements stated.
```

## Notes
- Output ports labeled A–H map to HDMI output ports 1–8 respectively.
- Input numbers 1–8 map to HDMI input ports 1–8 respectively.
- Device ID 255 broadcasts to all devices; only matching ID or 255 receives commands.
- USB and RS-232 must not be connected simultaneously — causes command confusion.
- DIP switch pin-4 selects RS-232 (OFF) vs USB (ON) normal operation mode.
- IR remote supports NEC, RC5, Sony, and other formats; RCA, RCM, Matsushita not recommended.
- No power on/off command available via serial — only via IR (code 0x02).
- Command format: two ASCII characters, no delimiter documented.

<!-- UNRESOLVED: command termination character (CR, LF, both?) not stated -->
<!-- UNRESOLVED: response format and content for ST and VR queries not documented -->
<!-- UNRESOLVED: device ID setting/getting via serial command format not documented -->
<!-- UNRESOLVED: whether routing commands produce acknowledgement response not stated -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HD88M-SR.pdf
  - https://www.manualslib.com/manual/450626/Atlona-At-Hd88m-Sr.html
retrieved_at: 2026-05-19T19:17:09.663Z
last_checked_at: 2026-05-20T04:51:27.573Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:51:27.573Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions (64 routing commands, 2 query commands, 3 IR custom codes) found verbatim in source command table; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "response format for queries not documented"
- "command termination character (CR/LF) not stated"
- "device ID addressing via serial not fully documented"
- "flow control not stated in source"
- "response format/values for ST and VR not documented in source"
- "no settable parameters (beyond routing and IR code) documented"
- "no multi-step sequences documented in source"
- "system lock feature exists (locks RS-232/USB/IR control) but"
- "command termination character (CR, LF, both?) not stated"
- "response format and content for ST and VR queries not documented"
- "device ID setting/getting via serial command format not documented"
- "whether routing commands produce acknowledgement response not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
