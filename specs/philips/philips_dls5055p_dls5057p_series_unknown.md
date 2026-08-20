---
spec_id: admin/philips-dls5055p-dls5057p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips DLS5055P DLS5057P Series Control Spec"
manufacturer: Philips
model_family: 49BDL5055P
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - 49BDL5055P
    - 55BDL5055P
    - 49BDL5057P
    - 55BDL5057P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - community.xibo.org.uk
  - agneovo.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
retrieved_at: 2026-08-09T20:51:37.192Z
last_checked_at: 2026-08-19T09:39:04.940Z
generated_at: 2026-08-19T09:39:04.940Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a command-list excerpt; no query/response feedback strings, no model-specific firmware ranges, no auth procedure, no safety/interlock text."
  - "source documents no query/response strings or unsolicited feedback payloads."
  - "source excerpt covers only power/input/volume/mute/tiling."
  - "source documents no unsolicited notifications."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "no model-to-firmware compatibility matrix; SICP version (V1.89+) is the only version signal."
  - "no response/ACK format documented — device reply behavior on command receipt unknown."
  - "no power-state, input-state, or volume-state query commands documented."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:39:04.940Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec action hex payloads match source rows verbatim; transport params (9600 8N1, TCP 5000) confirmed in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# Philips DLS5055P DLS5057P Series Control Spec

## Summary
Philips BDL 5055P/5057P series professional signage displays controlled via the SICP (SICP v1.99) protocol. Supports RS-232 serial and (on IP-capable models) TCP control. This spec covers power, input source selection, speaker/headphone volume, mute, and tiling commands documented in the "BDL SICP Commonly Used Protocol (V 1.89 onwards)" reference.

<!-- UNRESOLVED: source is a command-list excerpt; no query/response feedback strings, no model-specific firmware ranges, no auth procedure, no safety/interlock text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source states "for the models that supports SICP over IP" - TCP applies only to IP-capable variants
serial:
  baud_rate: 9600  # source: "Baud Rate : 9600 (except 75BDL3151T - baud rate:115200)" - 75BDL3151T not in this family
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # source: "the default port is TCP port 5000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off commands present
  - levelable   # inferred: volume set/up/down commands present
  - routable    # inferred: multiple input source selection commands present
```

## Actions
```yaml
actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: "06 00 00 18 02 1C"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "06 00 00 18 01 1F"
    params: []

  # --- Input source selection (each a distinct documented row) ---
  - id: select_input_hdmi1
    label: Select Input HDMI 1
    kind: action
    command: "09 00 00 AC 0D 00 01 00 A9"
    params: []

  - id: select_input_hdmi2
    label: Select Input HDMI 2
    kind: action
    command: "09 00 00 AC 06 00 01 00 A2"
    params: []

  - id: select_input_hdmi3
    label: Select Input HDMI 3
    kind: action
    command: "09 00 00 AC 0F 00 01 00 AB"
    params: []

  - id: select_input_hdmi4
    label: Select Input HDMI 4
    kind: action
    command: "09 00 00 AC 19 00 01 00 BD"
    params: []

  - id: select_input_vga
    label: Select Input VGA
    kind: action
    command: "09 00 00 AC 05 00 01 00 A1"
    params: []

  - id: select_input_dvi_d
    label: Select Input DVI-D
    kind: action
    command: "09 00 00 AC 0E 00 01 00 AA"
    params: []

  - id: select_input_usb
    label: Select Input USB
    kind: action
    command: "09 00 00 AC 0C 00 01 00 A8"
    params: []

  - id: select_input_custom
    label: Select Input Custom
    kind: action
    command: "09 00 00 AC 18 00 01 00 BC"
    params: []

  # --- Volume up/down (speaker and audio out) ---
  - id: volume_speaker_audio_up
    label: Volume Up (speaker and audio out)
    kind: action
    command: "07 00 00 41 01 01 46"
    params: []

  - id: volume_speaker_audio_down
    label: Volume Down (speaker and audio out)
    kind: action
    command: "07 00 00 41 00 00 46"
    params: []

  # --- Volume up/down (audio out only) ---
  - id: volume_audio_out_up
    label: Volume Up (audio out only)
    kind: action
    command: "07 00 00 41 02 01 45"
    params: []

  - id: volume_audio_out_down
    label: Volume Down (audio out only)
    kind: action
    command: "07 00 00 41 02 00 44"
    params: []

  # --- Mute ---
  - id: volume_mute
    label: Volume Mute
    kind: action
    command: "06 00 00 47 01 40"
    params: []

  - id: volume_unmute
    label: Volume Unmute
    kind: action
    command: "06 00 00 47 00 41"
    params: []

  # --- Volume set (parameterized; source rows: 0,10,20,...,100 as hex 00,0A,14,1E,28,32,3C,46,50,5A,64) ---
  # Note: source states "Most models only have max Volume 60" - actual max is model-dependent.
  - id: volume_set
    label: Set Volume
    kind: action
    command: "07 00 00 44 {level_hex} {level_hex} 43"
    params:
      - name: level
        type: integer
        description: "Volume level 0-100 (decimal). Send as two-digit hex twice in payload. Source notes most models cap at 60."
      - name: level_hex
        type: string
        description: "Computed: two-digit uppercase hex of `level` (e.g. 50 -> '32'). Repeated twice in payload; trailing checksum byte 43 is fixed in this command group."

  # --- Tiling ---
  - id: tiling_enable
    label: Enable Tiling
    kind: action
    command: "09 00 00 22 01 02 00 00 1C"
    params: []

  - id: tiling_disable
    label: Disable Tiling
    kind: action
    command: "09 00 00 22 00 02 00 00 1D"
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no query/response strings or unsolicited feedback payloads.
# The command list is one-way (set/action) only.
```

## Variables
```yaml
# Volume level is exposed as an action (volume_set); no separate settable-variable
# semantics are documented. Other settable parameters (brightness, contrast, etc.)
# are not present in this source excerpt.
# UNRESOLVED: source excerpt covers only power/input/volume/mute/tiling.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Power On/Off commands are present but no
# cooldown/wait guidance is documented.
```

## Notes
- Source: "BDL SICP Commonly Used Protocol (V 1.89 onwards)" — a command excerpt listing SICP v1.99 hex payloads. Title implies V1.89+ firmware; exact firmware compatibility range per model is not stated.
- All payloads are hex byte sequences (space-separated as in source). Last byte of each command is a checksum; for the `09 00 00 AC {x} 00 01 00 {cs}` input-select group, `cs` varies per input code, and source lists each input with its precomputed checksum verbatim — do not recompute.
- Volume set bytes: the level appears twice in the payload (e.g. level 50 = `32 32`), final byte `43` is constant across all volume-set rows in source.
- Source note: "Most models only have max Volume 60" — treat volume >60 as model-dependent; verify against target device before sending.
- TCP applies only to IP-capable variants ("for the models that supports SICP over IP"); serial applies to all.
- Baud rate exception noted in source (75BDL3151T = 115200) does not affect this family.

<!-- UNRESOLVED: no model-to-firmware compatibility matrix; SICP version (V1.89+) is the only version signal. -->
<!-- UNRESOLVED: no response/ACK format documented — device reply behavior on command receipt unknown. -->
<!-- UNRESOLVED: no power-state, input-state, or volume-state query commands documented. -->

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - community.xibo.org.uk
  - agneovo.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
retrieved_at: 2026-08-09T20:51:37.192Z
last_checked_at: 2026-08-19T09:39:04.940Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:39:04.940Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec action hex payloads match source rows verbatim; transport params (9600 8N1, TCP 5000) confirmed in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a command-list excerpt; no query/response feedback strings, no model-specific firmware ranges, no auth procedure, no safety/interlock text."
- "source documents no query/response strings or unsolicited feedback payloads."
- "source excerpt covers only power/input/volume/mute/tiling."
- "source documents no unsolicited notifications."
- "source documents no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "no model-to-firmware compatibility matrix; SICP version (V1.89+) is the only version signal."
- "no response/ACK format documented — device reply behavior on command receipt unknown."
- "no power-state, input-state, or volume-state query commands documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
