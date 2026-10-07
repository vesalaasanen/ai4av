---
spec_id: admin/sharp-lc-un-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LC-UN Series Control Spec"
manufacturer: Sharp
model_family: "LC-UN Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LC-UN Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-01T06:49:05.688Z
last_checked_at: 2026-10-01T06:49:05.688Z
generated_at: 2026-10-01T06:49:05.688Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "monitor disconnects after 15 min; controller must reconnect — no auth procedure in source"
  - "full VCP table not fully enumerated; only selected entries from source shown"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "DHCP default on; IP address configuration not documented in this spec"
  - "TV tuner commands marked as US-only; tuner models not specified"
  - "temperature sensor readout — only available on models with built-in sensors"
  - "model-specific source not located"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-10-01T06:49:05.688Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec action units map one-to-one to documented CTL/VCP messages; coverage bidirectional; transport values verbatim in source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Sharp LC-UN Series Control Spec

## Summary
Sharp LC-UN Series LCD monitor. External control via RS-232C (9600 baud, 8N1) and LAN (TCP port 7142). Two command protocols: VCP (get/set parameters via OP codes) and CTL (direct commands for power, identity, timing). 600ms packet interval required between commands. Monitor drops TCP connections after 15 minutes of inactivity.

<!-- UNRESOLVED: monitor disconnects after 15 min; controller must reconnect — no auth procedure in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port (fixed)
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # CTL-C203-D6 power control; CTL-01D6 power status read
- queryable    # VCP get parameter; CTL get timing, serial number, model name, firmware
- levelable    # VCP-00-10 backlight, VCP-00-12 contrast, VCP-00-16/18/1A color
- routable     # VCP-00-60 input select; HDMI1/2/3, VGA, AV, Tuner, Media Player
```

## Actions
```yaml
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []

- id: power_status_read
  label: Power Status Read
  kind: query
  params: []

- id: power_control
  label: Power Control
  kind: action
  params:
    - name: power_mode
      type: enum
      values:
        - "0001"  # ON
        - "0004"  # OFF
      description: Power mode (0001=ON, 0004=OFF)

- id: serial_number_read
  label: Serial Number Read
  kind: query
  params: []

- id: model_name_read
  label: Model Name Read
  kind: query
  params: []

- id: mac_address_read
  label: MAC Address Read
  kind: query
  params: []

- id: direct_tv_channel_read
  label: Direct TV Channel Read
  kind: query
  params: []

- id: direct_tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_channel_high
      type: string
    - name: major_channel_low
      type: string
    - name: minor_channel
      type: string

- id: remote_control_code_send
  label: Remote Control Data Code Send
  kind: action
  params:
    - name: remote_code
      type: string
      description: 2-byte hex code (e.g. "1D"=PICTURE, "08"=1, "12"=0)
    - name: repeat_times
      type: string

- id: firmware_version_read
  label: Firmware Version Read
  kind: query
  params:
    - name: firmware_type
      type: string
      default: "00"
      description: "00" = F/W Revision

- id: input_name_read
  label: Input Name of Designated Terminal Read
  kind: query
  params:
    - name: input_terminal
      type: string
      description: "01"=VGA(RGB), "05"=AV, "09"=Tuner, "0C"=VGA(YPbPr), "11"=HDMI1, "12"=HDMI2, "82"=HDMI3, "87"=MP

- id: input_name_write
  label: Input Name of Designated Terminal Write
  kind: action
  params:
    - name: input_terminal
      type: string
    - name: input_name
      type: string

- id: input_name_reset
  label: Input Name of Designated Terminal Reset
  kind: action
  params:
    - name: input_terminal
      type: string
      description: "00"=ALL, "01"=VGA(RGB), "05"=AV, "09"=Tuner, "0C"=VGA(YPbPr), "11"=HDMI1, "12"=HDMI2, "82"=HDMI3, "87"=MP

- id: vcp_get
  label: VCP Get Parameter
  kind: query
  params:
    - name: op_code_page
      type: string
      description: OP code page (e.g. "00", "02", "10")
    - name: op_code
      type: string
      description: OP code within page (e.g. "10"=backlight, "60"=input select)

- id: vcp_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: op_code_page
      type: string
    - name: op_code
      type: string
    - name: set_value
      type: string
      description: 4-digit hex value (e.g. "0050"=80 decimal)
```

## Feedbacks
```yaml
- id: power_status_reply
  label: Power Status Reply
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by (power save)
    - "0003"  # Reserved
    - "0004"  # OFF

- id: vcp_get_reply
  label: VCP Get Parameter Reply
  type: object
  fields:
    - name: result_code
      type: enum
      values:
        - "00"  # No Error
        - "01"  # Unsupported
    - name: op_code_page
      type: string
    - name: op_code
      type: string
    - name: type
      type: enum
      values:
        - "00"  # Set parameter
        - "01"  # Momentary
    - name: max_value
      type: integer
    - name: current_value
      type: integer

- id: vcp_set_reply
  label: VCP Set Parameter Reply
  type: object
  fields:
    - name: result_code
      type: enum
      values:
        - "00"  # No Error
        - "01"  # Unsupported
    - name: op_code_page
      type: string
    - name: op_code
      type: string
    - name: type
      type: enum
      values:
        - "00"  # Set parameter
        - "01"  # Momentary
    - name: max_value
      type: integer
    - name: requested_value
      type: integer

- id: timing_report_reply
  label: Timing Report Reply
  type: object
  fields:
    - name: timing_status
      type: object
      fields:
        - name: sync_out_of_range
          type: boolean
        - name: unstable_count
          type: boolean
        - name: h_sync_polarity
          type: enum
          values: [positive, negative]
        - name: v_sync_polarity
          type: enum
          values: [positive, negative]
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

- id: null_message
  label: NULL Message
  type: enum
  values:
    - "timeout_error"
    - "unsupported_message"
    - "bcc_error"
    - "not_ready"
    - "operation_in_progress"
```

## Variables
```yaml
# VCP codes for settable parameters - selected entries from spec
# UNRESOLVED: full VCP table not fully enumerated; only selected entries from source shown

- id: backlight
  label: Backlight
  type: range
  min: 0
  max: 100
  vcp: "VCP-00-10"

- id: contrast
  label: Contrast
  type: range
  min: 0
  max: 100
  vcp: "VCP-00-12"

- id: input_select
  label: Input Select
  type: enum
  values:
    - "0001"  # VGA(RGB)
    - "0005"  # Video1(AV)
    - "0009"  # Tuner1(TV)
    - "000C"  # DVD/HD1(VGA(YPbPr))
    - "0011"  # HDMI1
    - "0012"  # HDMI2
    - "0082"  # HDMI3
    - "0087"  # MP(Media Player)
  vcp: "VCP-00-60"

- id: power_mode
  label: Power Mode
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Do not set
    - "0003"  # Do not set
    - "0004"  # OFF
  vcp: "CTL-C203-D6"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Device called "NEC LCD monitor" in source section 1 — likely shared template; device is Sharp LC-UN Series per title and section headers.

Packet interval between commands must exceed 600ms.

TCP connection drops after 15 minutes of inactivity; controller must reconnect.

VCP (Video Control Protocol) uses OP code page + OP code format. CTL commands are binary-style direct commands with specific byte sequences.

Monitor ID range: 1–100; broadcast address is `*` (2Ah). Group IDs: 1–9 mapped to 31h–39h.

Check code (BCC) is XOR of bytes D1–D16 after header+STX; delimiter is CR (0Dh).

<!-- UNRESOLVED: DHCP default on; IP address configuration not documented in this spec -->
<!-- UNRESOLVED: TV tuner commands marked as US-only; tuner models not specified -->
<!-- UNRESOLVED: temperature sensor readout — only available on models with built-in sensors -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-01T06:49:05.688Z
last_checked_at: 2026-10-01T06:49:05.688Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:49:05.688Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec action units map one-to-one to documented CTL/VCP messages; coverage bidirectional; transport values verbatim in source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "monitor disconnects after 15 min; controller must reconnect — no auth procedure in source"
- "full VCP table not fully enumerated; only selected entries from source shown"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "DHCP default on; IP address configuration not documented in this spec"
- "TV tuner commands marked as US-only; tuner models not specified"
- "temperature sensor readout — only available on models with built-in sensors"
- "model-specific source not located"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
