---
spec_id: admin/philips-65bdl3051t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips 65BDL3051T Control Spec"
manufacturer: Philips
model_family: 65BDL3051T
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - 65BDL3051T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - community.xibo.org.uk
  - documents.philips.com
  - manua.ls
  - manualmachine.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.documents.philips.com/assets/20230615/8c61ee5c7c0e4ef68b82b022008feacb.pdf
  - https://www.manua.ls/philips/65bdl3051t/manual
  - https://manualmachine.com/philips/65bdl3051t/4559247-user-guide/
retrieved_at: 2026-07-26T14:02:52.307Z
last_checked_at: 2026-08-05T08:36:14.249Z
generated_at: 2026-08-05T08:36:14.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a partial \"commonly used\" command subset; full SICP v1.99 catalogue (linked SharePoint doc) not extracted. No query/status commands, response formats, or feedback frames documented in this source."
  - "whether 65BDL3051T specifically supports SICP over IP is not confirmed in source (IP support stated as model-dependent)."
  - "source documents no response/acknowledgement frames, status query"
  - "full SICP parameter set not extracted."
  - "source documents no unsolicited notifications/events."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
  - "source is a \"commonly used\" subset; the authoritative full SICP v1.99 document (https://westanonline.sharepoint.com/.../Support/...) was not extracted — additional power state queries, status feedbacks, and advanced commands likely exist there."
  - "response/ack frame format for each command not documented here."
  - "65BDL3051T-specific IP support and full input list not confirmed."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:36:14.249Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions (power, 9 inputs, 4 volume variants, mute/unmute, parameterized volume_set, tiling) have literal hex matches in the source, transport parameters are verbatim, and no extra source commands exist. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Philips 65BDL3051T Control Spec

## Summary
Philips 65BDL3051T professional display (BDL series) controlled via the SICP (BDL SICP Commonly Used Protocol, V1.89 onwards) protocol. SICP uses fixed-length HEX command frames over RS-232, and over TCP/IP (port 5000) on IP-capable models. This spec covers power, input selection, volume, mute, and video-wall tiling commands documented in the BDL SICP command table.

<!-- UNRESOLVED: source is a partial "commonly used" command subset; full SICP v1.99 catalogue (linked SharePoint doc) not extracted. No query/status commands, response formats, or feedback frames documented in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # source: "for the models that supports SICP over IP, the default port is TCP port 5000"
serial:
  baud_rate: 9600  # source: "Baud Rate: 9600 (except 75BDL3151T - baud rate:115200)"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # default TCP port for SICP over IP (model-dependent)
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: whether 65BDL3051T specifically supports SICP over IP is not confirmed in source (IP support stated as model-dependent). -->

## Traits
```yaml
traits:
  - powerable  # inferred: power on/off commands present
  - routable   # inferred: input/source selection commands present
  - levelable  # inferred: volume set / up / down commands present
```

## Actions
```yaml
# SICP HEX frames. Last byte of each frame is an XOR checksum of all preceding
# bytes (verified: e.g. 06^00^00^18^02 = 1C; 07^00^00^44^0A^0A = 43).
# Source: "BDL SICP Commonly Used Protocol (V 1.89 onwards)" command table.

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
    label: Select Input HDMI
    kind: action
    command: "09 00 00 AC 0D 00 01 00 A9"
    params: []

  - id: input_hdmi2
    label: Select Input HDMI2
    kind: action
    command: "09 00 00 AC 06 00 01 00 A2"
    params: []

  - id: input_hdmi3
    label: Select Input HDMI3
    kind: action
    command: "09 00 00 AC 0F 00 01 00 AB"
    params: []

  - id: input_hdmi4
    label: Select Input HDMI4
    kind: action
    command: "09 00 00 AC 19 00 01 00 BD"
    params: []

  - id: input_vga
    label: Select Input VGA
    kind: action
    command: "09 00 00 AC 05 00 01 00 A1"
    params: []

  - id: input_dvi_d
    label: Select Input DVI-D
    kind: action
    command: "09 00 00 AC 0E 00 01 00 AA"
    params: []

  - id: input_usb
    label: Select Input USB
    kind: action
    command: "09 00 00 AC 0C 00 01 00 A8"
    params: []

  - id: input_custom
    label: Select Input Custom
    kind: action
    command: "09 00 00 AC 18 00 01 00 BC"
    params: []

  - id: volume_speaker_and_audio_out_up
    label: Volume (speaker and audio out) Up
    kind: action
    command: "07 00 00 41 01 01 46"
    params: []

  - id: volume_speaker_and_audio_out_down
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

  # Volume set - opcode 0x44. Source lists discrete levels 0,10,20,...,100 as
  # rows sharing this opcode with only the value byte varying (analogous to an
  # MV{level} set command); collapsed to one parameterized action per the
  # granularity rule. In all source rows both data bytes equal the level and the
  # trailing byte is the XOR checksum.
  - id: volume_set
    label: Set Volume
    kind: action
    command: "07 00 00 44 {level_hex} {level_hex} {xor_checksum}"
    params:
      - name: level
        type: integer
        description: "Volume level 0-100 in steps of 10. Source note: 'Most models only have max Volume 60'. {level_hex} is the level value in hex (0x00-0x64); {xor_checksum} = XOR of all preceding bytes."
    notes:
      - "Source-documented levels: 0 (00), 10 (0A), 20 (14), 30 (1E), 40 (28), 50 (32), 60 (3C), 70 (46), 80 (50), 90 (5A), 100 (64)."

  - id: tiling_enable
    label: Enable Tiling (Video Wall)
    kind: action
    command: "09 00 00 22 01 02 00 00 1C"
    params: []

  - id: tiling_disable
    label: Disable Tiling (Video Wall)
    kind: action
    command: "09 00 00 22 00 02 00 00 1D"
    params: []
```

## Feedbacks
```yaml
feedbacks: []
# UNRESOLVED: source documents no response/acknowledgement frames, status query
# commands, or query-return formats. The full SICP v1.99 doc (linked but not
# extracted) may define these.
```

## Variables
```yaml
variables: []
# Volume level is represented as the volume_set action. No other settable
# parameters documented in this source subset.
# UNRESOLVED: full SICP parameter set not extracted.
```

## Events
```yaml
events: []
# UNRESOLVED: source documents no unsolicited notifications/events.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Never inferred.
```

## Notes
- Protocol name: SICP (BDL SICP Commonly Used Protocol). Source header states "V 1.89 onwards" and references a "SICP v1.99" command table.
- Frames are fixed-length HEX. The final byte of every documented frame is an XOR checksum of all preceding bytes (confirmed against multiple examples: Power On `06^00^00^18^02=1C`; Volume 10 `07^00^00^44^0A^0A=43`; Input HDMI `09^00^00^AC^0D^00^01^00=A9`).
- RS-232 serial config is fixed across the BDL family: 9600 baud, 8N1, no flow control. Exception noted in source: 75BDL3151T uses 115200 baud (does not apply to 65BDL3051T).
- IP control (TCP port 5000) is model-dependent per the source; not explicitly confirmed for 65BDL3051T.
- Source volume note: "Most models only have max Volume 60" — above 60 may be unsupported on some models.
- Input commands carry two trailing parameter bytes (`00 01` in all documented input rows) whose meaning (e.g. sub-source / slot) is not explained in source; reproduced verbatim.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: source is a "commonly used" subset; the authoritative full SICP v1.99 document (https://westanonline.sharepoint.com/.../Support/...) was not extracted — additional power state queries, status feedbacks, and advanced commands likely exist there. -->
<!-- UNRESOLVED: response/ack frame format for each command not documented here. -->
<!-- UNRESOLVED: 65BDL3051T-specific IP support and full input list not confirmed. -->
```

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - community.xibo.org.uk
  - documents.philips.com
  - manua.ls
  - manualmachine.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.documents.philips.com/assets/20230615/8c61ee5c7c0e4ef68b82b022008feacb.pdf
  - https://www.manua.ls/philips/65bdl3051t/manual
  - https://manualmachine.com/philips/65bdl3051t/4559247-user-guide/
retrieved_at: 2026-07-26T14:02:52.307Z
last_checked_at: 2026-08-05T08:36:14.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:36:14.249Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions (power, 9 inputs, 4 volume variants, mute/unmute, parameterized volume_set, tiling) have literal hex matches in the source, transport parameters are verbatim, and no extra source commands exist. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a partial \"commonly used\" command subset; full SICP v1.99 catalogue (linked SharePoint doc) not extracted. No query/status commands, response formats, or feedback frames documented in this source."
- "whether 65BDL3051T specifically supports SICP over IP is not confirmed in source (IP support stated as model-dependent)."
- "source documents no response/acknowledgement frames, status query"
- "full SICP parameter set not extracted."
- "source documents no unsolicited notifications/events."
- "source documents no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
- "source is a \"commonly used\" subset; the authoritative full SICP v1.99 document (https://westanonline.sharepoint.com/.../Support/...) was not extracted — additional power state queries, status feedbacks, and advanced commands likely exist there."
- "response/ack frame format for each command not documented here."
- "65BDL3051T-specific IP support and full input list not confirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
