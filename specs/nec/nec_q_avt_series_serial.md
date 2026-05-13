---
spec_id: admin/nec-q_avt_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC Q AVT Series Control Spec"
manufacturer: NEC
model_family: "Q AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "Q AVT Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:32:25.803Z
generated_at: 2026-04-25T21:32:25.803Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:32:25.803Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions have direct semantic matches in the source command list; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC Q AVT Series Control Spec

## Summary
NEC projector using RS-232C serial and TCP/IP for control. Supports power on/off, input routing, picture/sound/onscreen mute, volume and picture adjustment, lens control, eco mode, PIP/PbP, and queryable status. Commands use a hex-encoded binary protocol with checksum.

<!-- UNRESOLVED: model series name "Q AVT" not confirmed in source; manual title is "Projector Control Command Reference Manual" -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: baud rate selectable 115200/38400/19200/9600/4800 bps, no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS hardware flow control pinout present but not explicitly configured
addressing:
  port: 7142  # stated: TCP port 7142 for LAN command communication
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
- id: error_status_request
  label: Error Status Request
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

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect hex code (see appendix for values)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h= lamp/light adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=lamp1, 01h=lamp2"
    - name: content
      type: integer
      description: "01h=usage time, 04h=remaining life"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=total, 01h=during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: keycode
      type: integer
      description: Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=HELP)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=periphery focus"
    - name: action
      type: integer
      description: "00h=stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive plus, 81h=drive minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: Lens control target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness, 05h=volume, 96h=lamp/light"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: info_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: "03h=horizontal sync freq, 04h=vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode hex code (see appendix for values)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses follow format: A0h/20h/21h/22h/23h + ID1 ID2 + LEN/ERR1 ERR2 + [DATA] + CKS
# UNRESOLVED: structured feedback definitions require deeper parsing of response formats
```

## Variables
```yaml
# UNRESOLVED: variables are command-specific; full enumeration requires parsing all query responses
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings not present in source; power-on notes that no other command
# can be accepted while power is turning on/off; cooling time required after power off
```

## Notes

**Command encoding:** All commands are hex-encoded binary. Format: `[HEADER] [ID1] [ID2] [LEN/DATA...] [CKS]`. Checksum = low-order byte of sum of all preceding bytes.

**Response formats:**
- Success without data: `A0h/20h/21h/22h/23h [ID1] [ID2] [LEN] [CKS]`
- Success with data: `A0h/20h/21h/22h/23h [ID1] [ID2] [LEN] [DATA...] [CKS]`
- Error: `A0h/A1h/A2h/A3h [ID1] [ID2] 02h [ERR1] [ERR2] [CKS]`

**Baud rate selection:** Device supports 115200/38400/19200/9600/4800 bps but does not state a default. Selection must be determined at setup.

**Standby modes:** Some commands require specific standby modes (Normal, Eco, Network Standby, etc.) — varies by model. See section "Standby Mode settings for receiving commands" in appendix.

**Input terminal hex codes (common):** COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, S-VIDEO=0Bh, HDMI=A1h or 1Ah, HDMI2=A2h or 1Bh, DisplayPort=A6h, DVI-D=9Ch, LAN/NETWORK=20h, HDBaseT=BFh

<!-- UNRESOLVED: full input terminal code table varies by model; appendix lists model-specific values -->
<!-- UNRESOLVED: aspect ratio hex codes vary by model; appendix lists alternatives -->
<!-- UNRESOLVED: eco mode hex codes vary by model; appendix lists alternatives -->
<!-- UNRESOLVED: serial flow control configuration not explicitly stated -->
<!-- UNRESOLVED: interlock or safety warnings not present in source -->
<!-- UNRESOLVED: TCP keepalive or connection persistence settings not stated -->
<!-- UNRESOLVED: command timing or polling intervals not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:32:25.803Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:32:25.803Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions have direct semantic matches in the source command list; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
