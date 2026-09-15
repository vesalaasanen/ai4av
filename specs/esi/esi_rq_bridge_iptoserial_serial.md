---
spec_id: admin/esi-rq-bridge-iptoserial
schema_version: ai4av-public-spec-v1
revision: 1
title: "ESI RQ Bridge Control Spec"
manufacturer: ESI
model_family: "RQ Bridge"
aliases: []
compatible_with:
  manufacturers:
    - ESI
    - "ESI (Electronic Solutions, Inc.)"
  models:
    - "RQ Bridge"
    - "RQ Bridge U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - seymourscreenexcellence.com
  - manualslib.com
source_urls:
  - https://www.seymourscreenexcellence.com/documents/RQ-Bridge-v4.0-Command-Summary-rev1.pdf
  - https://www.manualslib.com/manual/1889590/Esi-Rf-Bridge.html
  - https://www.seymourscreenexcellence.com/documents/RQ-Bridge-v4.0-Quick-Setup-rev1.pdf
retrieved_at: 2026-05-04T15:10:22.474Z
last_checked_at: 2026-09-11T22:16:14.946Z
generated_at: 2026-09-11T22:16:14.946Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RQ motor-control commands and downstream node-specific commands are documented in separate per-device Command Summary documents, not in this source."
  - "voltage/current/power specifications not stated in source."
  - "source documents parameter set commands (pC, pS, pV) as discrete"
  - "source does not document multi-step sequences originating on the"
  - "source describes X-off-without-X-on behavior as fatal to the"
  - "no additional safety warnings, interlocks, or power-on sequencing"
  - "downstream RQ motor-control command catalogue (per-device Command Summary manuals) is not included in this source and therefore not represented here."
  - "RS-422 specific electrical parameters (termination value, drive capability) not stated in source."
  - "maximum supported cable length / bus topology constraints not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-11T22:16:14.946Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions map1:1 to RQ Bridge commands and unsolicited reports documented in the source, and transport (9600/8N1/X-on-X-off) is verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# ESI RQ Bridge Control Spec

## Summary
RS-232/RS-422 bridge device exposing an Electronic Solutions RQ Bus (6-wire phone cable) as a serial interface for a Controller/PC. The RQ Bridge wraps downstream RQ Bus traffic in a framed ASCII command protocol (`!ADDR CMD DATA;`) terminated by `;` or `<CR>`. This spec covers the RQ Bridge's bridge-side serial interface and the RQ commands the bridge itself recognizes (version, name, re-address, parameter, verbose, error/undefined reports).

<!-- UNRESOLVED: RQ motor-control commands and downstream node-specific commands are documented in separate per-device Command Summary documents, not in this source. -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from v?, N?, p? style query commands documented
```

## Actions
```yaml
- id: request_version
  label: Request RQ Bridge Version
  kind: query
  command: "!BR1v?;"
  params: []
  notes: Generic form: "!{ADDR}v?;" - Bridge factory address is BR1. Response: "!BR1vB40;"

- id: assign_name
  label: Assign RQ Bridge Name
  kind: action
  command: "!BR1N{name};"
  params:
    - name: name
      type: string
      description: 1-16 characters; name cannot be "?"
  notes: Response: "!BR1N{name};" (name report)

- id: request_name
  label: Request RQ Bridge Name
  kind: query
  command: "!BR1N?;"
  params: []
  notes: Response: "!BR1N{name};"

- id: re_address
  label: Re-address RQ Bridge
  kind: action
  command: "!BR1@{new_address};"
  params:
    - name: new_address
      type: string
      description: 3 ASCII characters, 0-9 or A-Z only; cannot be 000
  notes: Response: "!{new_address}ABR1;" (old address echoed in acknowledge). Bridge cannot be randomized via "~".

- id: set_param_cr
  label: Set Uplink End-of-Message to CR
  kind: action
  command: "!BR1pC;"
  params: []
  notes: Use <CR> as end-of-message character on Uplink messages (not semicolon).

- id: set_param_semicolon
  label: Set Uplink End-of-Message to Semicolon
  kind: action
  command: "!BR1pS;"
  params: []
  notes: Use ";" as end-of-message character on Uplink messages (not CR).

- id: set_param_verbose
  label: Enable Verbose Mode
  kind: action
  command: "!BR1pV;"
  params: []
  notes: Verbose mode cannot be disabled on v4.0. Enables unsolicited Uplink reporting and version-on-power-up.

- id: global_version_request
  label: Global Version Request
  kind: query
  command: "!000v?;"
  params: []
  notes: Bridge responds first, then passes message Downlink so all nodes also report.

- id: global_randomize_addresses
  label: Global Randomize Addresses (~)
  kind: action
  command: "!000~;"
  params: []
  notes: Pass-through Downlink only; the Bridge itself does not respond. Documented in "Set Up Multiple RQs" example. Not a Bridge-recognized command.

- id: parse_error_report
  label: Receive RQ Bridge Error Report (parse)
  kind: feedback
  command: "!BR1E{code};"
  params:
    - name: code
      type: string
      description: 2-character error code: "do" = downlink buffer overflow (message discarded); "ml" = uplink message lost
  notes: Unsolicited uplink error report from Bridge.

- id: parse_undefined_report
  label: Receive RQ Bridge Undefined/Bad Message Report (parse)
  kind: feedback
  command: "!BR1U;"
  params: []
  notes: Sent when Bridge receives improperly formatted message or out-of-range content.

- id: parse_address_change_report
  label: Receive Address Change Acknowledge (parse)
  kind: feedback
  command: "!{new_address}A{old_address};"
  params:
    - name: new_address
      type: string
      description: 3 ASCII chars, 0-9 or A-Z
    - name: old_address
      type: string
      description: 3 ASCII chars (previous address)
  notes: Uplink acknowledge following a successful "@" re-address command.

- id: parse_xon
  label: Receive X-on Flow Control (parse)
  kind: feedback
  command: "\x11"
  params: []
  notes: ASCII 17, 0x11, DC1. Sent on power-up regardless; Bridge resumes sending messages.

- id: parse_xoff
  label: Receive X-off Flow Control (parse)
  kind: feedback
  command: "\x13"
  params: []
  notes: ASCII 19, 0x13, DC3. Sent when Bridge downlink buffer exceeds 1/2 full (~128 bytes). X-off without subsequent X-on "kills" the Bridge - no automatic timer.
```

## Feedbacks
```yaml
- id: bridge_version
  type: string
  values: ["B40"]
  notes: Reported in "!BR1v{version};" response.

- id: bridge_name
  type: string
  values: []
  notes: Reported in "!BR1N{name};" response. 1-16 characters.

- id: bridge_address
  type: string
  values: []
  notes: Factory default BR1; reassignable via "@". Appears as the 3-char Address field in every framed message.

- id: error_code
  type: enum
  values: ["do", "ml"]
  notes: "do" = downlink buffer overflow; "ml" = uplink message lost.

- id: uplink_end_char
  type: enum
  values: [";", "\r"]
  notes: Configured via pS / pC parameter commands. Default ";".

- id: verbose_mode
  type: enum
  values: ["on"]
  notes: Documented as always-on for v4.0; cannot be disabled.
```

## Variables
```yaml
# UNRESOLVED: source documents parameter set commands (pC, pS, pV) as discrete
# actions rather than as settable variables, so no Variables entries are emitted.
```

## Events
```yaml
- id: power_up_report
  description: On power-up the Bridge sends <X-on> (0x11) and reports its version "!BR1vB40;". LED blinks GREEN RED GREEN.
- id: downlink_buffer_overflow
  description: "<X-off> (0x13) sent when downlink buffer exceeds 1/2 full (~128 bytes)."
- id: uplink_buffer_overflow
  description: "!BR1Eml;" emitted when uplink buffer overflows and at least one message is lost.
- id: verbose_unsolicited
  description: With Verbose mode enabled, unsolicited Uplink messages are forwarded to the Controller.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences originating on the
# Bridge itself. The "Set Up Multiple RQs" example is a sequence of generic RQ
# Bus commands (not Bridge-recognized), so it lives in Notes rather than here.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # UNRESOLVED: source describes X-off-without-X-on behavior as fatal to the
  # Bridge (no automatic timer), but does not frame it as a safety interlock.
  - description: "Sending X-off to the Bridge without a subsequent X-on halts the Bridge with no auto-recovery. Controller must send X-on (0x11) to resume."
# UNRESOLVED: no additional safety warnings, interlocks, or power-on sequencing
# requirements are stated in the source beyond the X-on/X-off flow-control rule.
```

## Notes
**Bridge-recognized commands vs. pass-through.** The RQ Bridge itself recognizes only `v`, `N`, `@`, `p`, plus the unsolicited `E`, `U`, and `A` reports. The `~` (randomize address), `r` (request data), and other RQ motor-control commands are pass-through Downlink traffic to other nodes on the RQ Bus — they are documented in per-device Command Summary manuals, not in this source.

**Case sensitivity.** Source states "Case matters everywhere." Addresses use 0-9 and A-Z only; lowercase is rejected with `!BR1U;`.

**Character restrictions.** Address and Command fields disallow `!`, `;`, and `<control>` (ASCII 0–31). Extended ASCII (0x80–0xFF) is NOT allowed anywhere. Data field disallows `!`, `;`, `<control>`.

**End-of-message character.** Downlink accepts either `;` or `<CR>`. Uplink end character is configured per-Bridge (`pS` = `;`, `pC` = `<CR>`); default is `;`.

**RS-422 alternative.** Source documents RS-422 via spring terminals (A&B, Y&Z plus signal ground) with strap-selected termination resistor; the RQ Bridge cannot use half-duplex RS-485 because RQ allows unsolicited messages.

**Set Up Multiple RQs example (verbatim):** `!000v?;` → `!BR1vB40; …` then `!RND~;` → `!NXQARND; !KT6ARND;` (randomizes the two colliding `RND` addresses to `NXQ` and `KT6`). Randomize never produces an address below `C00`, so it cannot accidentally hit the Bridge's `BR1` address. A node sharing the Bridge's address cannot be randomized via `~`; the workaround is re-address the Bridge, randomize the offending node, then re-address the Bridge back.

**Power draw.** `12V` from an `RQ60xxx` is required for the Bridge; `5V` from a `DCPM` works only if the center strap is added. Source does not state current draw.

<!-- UNRESOLVED: downstream RQ motor-control command catalogue (per-device Command Summary manuals) is not included in this source and therefore not represented here. -->
<!-- UNRESOLVED: RS-422 specific electrical parameters (termination value, drive capability) not stated in source. -->
<!-- UNRESOLVED: maximum supported cable length / bus topology constraints not stated in source. -->

## Provenance

```yaml
source_domains:
  - seymourscreenexcellence.com
  - manualslib.com
source_urls:
  - https://www.seymourscreenexcellence.com/documents/RQ-Bridge-v4.0-Command-Summary-rev1.pdf
  - https://www.manualslib.com/manual/1889590/Esi-Rf-Bridge.html
  - https://www.seymourscreenexcellence.com/documents/RQ-Bridge-v4.0-Quick-Setup-rev1.pdf
retrieved_at: 2026-05-04T15:10:22.474Z
last_checked_at: 2026-09-11T22:16:14.946Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:16:14.946Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions map1:1 to RQ Bridge commands and unsolicited reports documented in the source, and transport (9600/8N1/X-on-X-off) is verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RQ motor-control commands and downstream node-specific commands are documented in separate per-device Command Summary documents, not in this source."
- "voltage/current/power specifications not stated in source."
- "source documents parameter set commands (pC, pS, pV) as discrete"
- "source does not document multi-step sequences originating on the"
- "source describes X-off-without-X-on behavior as fatal to the"
- "no additional safety warnings, interlocks, or power-on sequencing"
- "downstream RQ motor-control command catalogue (per-device Command Summary manuals) is not included in this source and therefore not represented here."
- "RS-422 specific electrical parameters (termination value, drive capability) not stated in source."
- "maximum supported cable length / bus topology constraints not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
