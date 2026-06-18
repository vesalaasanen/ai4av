---
spec_id: admin/philips-bdl-series1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips BDL Series1 Control Spec"
manufacturer: Philips
model_family: "BDL Series1"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "BDL Series1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - community.xibo.org.uk
  - digis.ru
  - avforums.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230615/79f6f497cfe94c5193f1b02200c05ae3.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://www.avforums.com/threads/how-to-control-a-philips-bdl4221-tv-via-the-rs232.1518435/
retrieved_at: 2026-06-15T01:54:31.653Z
last_checked_at: 2026-06-16T07:14:04.511Z
generated_at: 2026-06-16T07:14:04.511Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No response/feedback format documented in source. No query/status commands documented. No safety or interlock procedures documented."
  - "source documents no response/acknowledgement format or"
  - "source does not document settable parameters outside of"
  - "source documents no unsolicited notifications."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings, interlock procedures,"
  - "checksum algorithm not documented in source — full payloads used verbatim instead."
  - "complete SICP command catalogue not included — source is a \"commonly used protocol\" subset. Full SICP protocol document referenced via SharePoint link (not fetched)."
  - "no response frame format documented — cannot define feedbacks/events without knowing acknowledgement structure."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:14:04.511Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions match verbatim hex payloads in source. Transport parameters (serial 9600/8/none/1, TCP port 5000) confirmed. Bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Philips BDL Series1 Control Spec

## Summary
Philips BDL Series1 professional displays controlled via the SICP (Serial Interface Control Protocol), version 1.89 onwards. Supports both RS-232 serial and TCP/IP (SICP over IP, default port 5000). Commands are sent as hex byte frames with a trailing checksum byte.

<!-- UNRESOLVED: No response/feedback format documented in source. No query/status commands documented. No safety or interlock procedures documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # Note: 75BDL3151T uses 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # default TCP port for models supporting SICP over IP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - routable     # inferred from input selection commands
  - levelable    # inferred from volume control commands
```

## Actions
```yaml
actions:
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

  - id: input_hdmi
    label: Input HDMI
    kind: action
    command: "09 00 00 AC 0D 00 01 00 A9"
    params: []

  - id: input_hdmi2
    label: Input HDMI2
    kind: action
    command: "09 00 00 AC 06 00 01 00 A2"
    params: []

  - id: input_hdmi3
    label: Input HDMI3
    kind: action
    command: "09 00 00 AC 0F 00 01 00 AB"
    params: []

  - id: input_hdmi4
    label: Input HDMI4
    kind: action
    command: "09 00 00 AC 19 00 01 00 BD"
    params: []

  - id: input_vga
    label: Input VGA
    kind: action
    command: "09 00 00 AC 05 00 01 00 A1"
    params: []

  - id: input_dvi_d
    label: Input DVI-D
    kind: action
    command: "09 00 00 AC 0E 00 01 00 AA"
    params: []

  - id: input_usb
    label: Input USB
    kind: action
    command: "09 00 00 AC 0C 00 01 00 A8"
    params: []

  - id: input_custom
    label: Input Custom
    kind: action
    command: "09 00 00 AC 18 00 01 00 BC"
    params: []

  - id: volume_speaker_audio_up
    label: Volume (speaker and audio out) Up
    kind: action
    command: "07 00 00 41 01 01 46"
    params: []

  - id: volume_speaker_audio_down
    label: Volume (speaker and audio out) Down
    kind: action
    command: "07 00 00 41 00 00 46"
    params: []

  - id: volume_audio_out_up
    label: Volume (audio out) Up
    kind: action
    command: "07 00 00 41 02 01 45"
    params: []

  - id: volume_audio_out_down
    label: Volume (audio out) Down
    kind: action
    command: "07 00 00 41 02 00 44"
    params: []

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

  - id: volume_set
    label: Volume Set
    kind: action
    command: "07 00 00 44 {level_hex} {level_hex} 43"
    params:
      - name: level_hex
        type: string
        description: >
          Hexadecimal representation of volume level (0x00-0x64).
          Byte appears twice in frame. Most models cap at 60 (0x3C).
          Source documents values: 0x00, 0x0A, 0x14, 0x1E, 0x28,
          0x32, 0x3C, 0x46, 0x50, 0x5A, 0x64.

  - id: enable_tiling
    label: Enable Tiling
    kind: action
    command: "09 00 00 22 01 02 00 00 1C"
    params: []

  - id: disable_tiling
    label: Disable Tiling
    kind: action
    command: "09 00 00 22 00 02 00 00 1D"
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no response/acknowledgement format or
# query-response payloads. SICP frame responses not described.
```

## Variables
```yaml
# UNRESOLVED: source does not document settable parameters outside of
# discrete actions.
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
# UNRESOLVED: source contains no safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- Protocol is SICP (Serial Interface Control Protocol), documented version label is "V 1.89 onwards"; commands table header reads "SICP v1.99 Command (HEX)".
- Serial connection settings are uniform across models except **75BDL3151T**, which uses baud rate 115200 instead of 9600.
- TCP/IP control (SICP over IP) is supported only on certain models; default port is TCP 5000.
- The last byte of each hex frame is a checksum; the source provides full verbatim payloads including this byte. The checksum algorithm is not documented in this source.
- Most models cap volume at 60 (0x3C); values 70–100 (0x46–0x64) may not be supported on all hardware.

<!-- UNRESOLVED: checksum algorithm not documented in source — full payloads used verbatim instead. -->
<!-- UNRESOLVED: complete SICP command catalogue not included — source is a "commonly used protocol" subset. Full SICP protocol document referenced via SharePoint link (not fetched). -->
<!-- UNRESOLVED: no response frame format documented — cannot define feedbacks/events without knowing acknowledgement structure. -->
````

Spec done. 19 actions, all hex payloads verbatim. Serial + TCP transport populated from source. Checksum algo undocumented — full payloads used as-is. Full SICP doc behind SharePoint link, not fetched — this is "commonly used" subset only.

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - community.xibo.org.uk
  - digis.ru
  - avforums.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230615/79f6f497cfe94c5193f1b02200c05ae3.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://www.avforums.com/threads/how-to-control-a-philips-bdl4221-tv-via-the-rs232.1518435/
retrieved_at: 2026-06-15T01:54:31.653Z
last_checked_at: 2026-06-16T07:14:04.511Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:14:04.511Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions match verbatim hex payloads in source. Transport parameters (serial 9600/8/none/1, TCP port 5000) confirmed. Bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No response/feedback format documented in source. No query/status commands documented. No safety or interlock procedures documented."
- "source documents no response/acknowledgement format or"
- "source does not document settable parameters outside of"
- "source documents no unsolicited notifications."
- "source documents no multi-step sequences."
- "source contains no safety warnings, interlock procedures,"
- "checksum algorithm not documented in source — full payloads used verbatim instead."
- "complete SICP command catalogue not included — source is a \"commonly used protocol\" subset. Full SICP protocol document referenced via SharePoint link (not fetched)."
- "no response frame format documented — cannot define feedbacks/events without knowing acknowledgement structure."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
