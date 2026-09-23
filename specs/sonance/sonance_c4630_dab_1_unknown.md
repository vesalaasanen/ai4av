---
spec_id: admin/sonance-c4630-dab-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonance C4630 SE Control Spec"
manufacturer: Sonance
model_family: "C4630 SE"
aliases: []
compatible_with:
  manufacturers:
    - Sonance
  models:
    - "C4630 SE"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
  - manualslib.com
  - driverstore.rticontrol.com
source_urls:
  - https://usermanual.wiki/Sonance/SonanceC4630SeUsersManual447381.609049138.pdf
  - https://www.manualslib.com/manual/157446/Sonance-C4630-Se.html
  - https://usermanual.wiki/Sonance/SonanceDab1UsersManual447348.960920957.pdf
  - https://driverstore.rticontrol.com/driver/sonance-c4630-dab-1
retrieved_at: 2026-06-02T03:13:13.198Z
last_checked_at: 2026-09-21T22:17:38.566Z
generated_at: 2026-09-21T22:17:38.566Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Keypad button macro programming via Sonance Control Manager software is out of scope for serial control."
  - "no safety warnings or interlock procedures in refined source."
  - "firmware version compatibility not stated in source."
  - "no response timing/latency specs in source."
  - "source covers C4630 SE only; DAB-1 coverage not present in this document."
verification:
  verdict: verified
  checked_at: 2026-09-21T22:17:38.566Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions match source command/query tables verbatim; transport parameters (19200 8N1 none) match line 226 exactly; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sonance C4630 SE Control Spec

## Summary
The Sonance C4630 SE is a six-zone home audio system controller with keypad, IR, and RS-232 control. This spec covers the inbound RS-232 serial command protocol (fixed 19200 8N1, no flow control), which provides zone power, source select, volume, page volume, mute, balance, bass, treble, button-press simulation, and status queries. Commands start with a colon (`:`), end with a carriage return (`<cr>`), and are acknowledged with `+OK` or `+ERR`.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Keypad button macro programming via Sonance Control Manager software is out of scope for serial control. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples in source
traits:
  - powerable   # inferred from zone power commands (:Zxy)
  - routable    # inferred from per-zone source select (:Sxy)
  - queryable   # inferred from status queries (:Zx?, :Sx?, etc.)
  - levelable   # inferred from volume/balance/bass/treble commands
```

## Actions
```yaml
# Serial settings commands. Syntax verbatim from source; x = Zone 1-6 unless noted.
- id: zone_power
  label: Zone Power
  kind: action
  command: ":Zxy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: y
      type: enum
      description: State - 1 = On, 0 = Off

- id: all_zones_set
  label: All Zones Off (Global Setting)
  kind: action
  command: ":Zy<cr>"
  params:
    - name: y
      type: enum
      description: State - 1 = On, 0 = Off (Global Setting Only)

- id: source_select
  label: Source Select
  kind: action
  command: ":Sxy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: y
      type: integer
      description: Source 1 - 4

- id: volume_set
  label: Volume
  kind: action
  command: ":Vxyy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: yy
      type: integer
      description: Volume 0 - 60

- id: volume_step_up
  label: Volume Step Up
  kind: action
  command: ":Vx++<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: volume_step_down
  label: Volume Step Down
  kind: action
  command: ":Vx--<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: page_volume_set
  label: Page Volume
  kind: action
  command: ":Gxyy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: yy
      type: integer
      description: Page Volume 0 - 60

- id: page_volume_step_up
  label: Page Volume Step Up
  kind: action
  command: ":Gx++<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: page_volume_step_down
  label: Page Volume Step Down
  kind: action
  command: ":Gx--<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: mute
  label: Mute
  kind: action
  command: ":Mxy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: y
      type: enum
      description: 1 = Mute On, 0 = Mute Off

- id: balance_set
  label: Balance
  kind: action
  command: ":Bxyyy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: yyy
      type: integer
      description: Balance -10 to +10, Center = 0

- id: balance_bump_right
  label: Balance Bump Step Right
  kind: action
  command: ":Bx++<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: balance_bump_left
  label: Balance Bump Step Left
  kind: action
  command: ":Bx--<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: bass_set
  label: Bass
  kind: action
  command: ":Lxyy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: yy
      type: integer
      description: Bass -8 to +8, Flat = 0

- id: bass_step_up
  label: Bass Bump Step Up
  kind: action
  command: ":Lx++<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: bass_step_down
  label: Bass Bump Step Down
  kind: action
  command: ":Lx--<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: treble_set
  label: Treble
  kind: action
  command: ":Hxyy<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
    - name: yy
      type: integer
      description: Treble -8 to +8, Flat = 0

- id: treble_step_up
  label: Treble Bump Step Up
  kind: action
  command: ":Hx++<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: treble_step_down
  label: Treble Bump Step Down
  kind: action
  command: ":Hx--<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: simulate_button_press
  label: Simulate Button Press
  kind: action
  command: ":Pzxyyy<cr>"
  params:
    - name: z
      type: integer
      description: Zone number 1 - 6
    - name: x
      type: enum
      description: Command layer - 1 = PRESS, 2 = PRESS-AND-HOLD, 3 = DOUBLE-PRESS, 4 = EXTRA COMMANDS
    - name: yyy
      type: integer
      description: "Keypad button code (see Notes): Numeric 1-9 = 1-9, Numeric 0 = 10, Numeric - = 11, Numeric + = 12, Main Volume Up = 13, Main Mute = 14, Main Volume Down = 15, Main Off = 16, Main Source 1-4 = 17-20, Main Pause = 21, Main Play = 22, Main Backward = 23, Main Forward = 24, Remote OK = 25, Extra Commands = 001-200"

- id: zone_power_query
  label: Zone Power Query
  kind: query
  command: ":Zx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: any_zones_on_query
  label: Any Zones On Query
  kind: query
  command: ":Z?<cr>"
  params: []

- id: source_query
  label: Source Query
  kind: query
  command: ":Sx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: volume_query
  label: Volume Query
  kind: query
  command: ":Vx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: page_volume_query
  label: Page Volume Query
  kind: query
  command: ":Gx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: mute_query
  label: Mute Query
  kind: query
  command: ":Mx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: balance_query
  label: Balance Query
  kind: query
  command: ":Bx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: bass_query
  label: Bass Query
  kind: query
  command: ":Lx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6

- id: treble_query
  label: Treble Query
  kind: query
  command: ":Hx?<cr>"
  params:
    - name: x
      type: integer
      description: Zone 1 - 6
```

## Feedbacks
```yaml
- id: command_ack
  type: enum
  values: ["+OK", "+ERR"]
  description: "'+OK' if command recognized and executed; '+ERR' if invalid OR if unit cannot process it (e.g. turned OFF)"

- id: zone_power_response
  type: string
  format: "+Zxy"
  description: "x = zone, y = 1 if On, 0 if Off"

- id: any_zones_on_response
  type: string
  format: "+Zy"
  description: "y = 1 if any zone On, 0 if all zones Off"

- id: source_response
  type: string
  format: "+Sxy"
  description: "x = zone, y = current source (1 - 4)"

- id: volume_response
  type: string
  format: "+Vxy"
  description: "x = zone, y = current volume (0 - 60)"

- id: page_volume_response
  type: string
  format: "+Gxy"
  description: "x = zone, y = current page volume (0 - 60)"

- id: mute_response
  type: string
  format: "+Mxy"
  description: "x = zone, y = 1 if Mute On, 0 if Mute Off"

- id: balance_response
  type: string
  format: "+Bxy"
  description: "x = zone, y = current balance (-10 to +10)"

- id: bass_response
  type: string
  format: "+Lxy"
  description: "x = zone, y = current bass (-8 to +8)"

- id: treble_response
  type: string
  format: "+Hxy"
  description: "x = zone, y = current treble (-8 to +8)"
```

## Variables
```yaml
# All settable parameters (volume, page volume, balance, bass, treble, mute,
# power, source) are covered as discrete Actions above. No additional variables.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# Macro programming (keypad macros, outbound RS-232, Stop Macro, Repeat Steps)
# is done via Sonance Control Manager software, not via the inbound serial
# protocol. Not representable as serial-command macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in refined source.
```

## Notes
- **One-directional serial only (critical):** the C4630 SE operates EITHER inbound OR outbound via RS-232, never both. Placing a single RS-232 command in any macro configures the unit as an OUTBOUND serial device that will NOT respond to inbound commands. To enable inbound control, remove all RS-232 commands from all macros (use the System Configuration Report to find them).
- Even valid commands return `+ERR` if the unit cannot process them (e.g. turned OFF).
- No POWER ON button/command exists — pressing (or simulating) a Source Select button in an inactive zone turns the zone ON.
- **Multi-unit systems:** all commands work on any unit by inserting the Unit ID between the colon and the command letter, e.g. `:3V1++<cr>` = Volume Up, Zone 1, Unit 3. Units are linked via SYNC connections (up to four units).
- Command format: colon (`:`) + single command letter + parameters + carriage return (`<cr>`). Status queries replace the SETTING with `?`.
- RS-232 pinout: female DB-9 — Pin 2 = Receive (Rx), Pin 3 = Transmit (Tx), Pin 5 = Ground (Gnd).
- Outbound serial (macros) has adjustable baud rate and format (8N1/7E1/7O1/7M1/7S1); inbound protocol is fixed at 19200 8N1 no flow control.
- Programmed IR Port defaults match the four input sources (Port 1 = Source 1, etc.).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: no response timing/latency specs in source. -->
<!-- UNRESOLVED: source covers C4630 SE only; DAB-1 coverage not present in this document. -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - manualslib.com
  - driverstore.rticontrol.com
source_urls:
  - https://usermanual.wiki/Sonance/SonanceC4630SeUsersManual447381.609049138.pdf
  - https://www.manualslib.com/manual/157446/Sonance-C4630-Se.html
  - https://usermanual.wiki/Sonance/SonanceDab1UsersManual447348.960920957.pdf
  - https://driverstore.rticontrol.com/driver/sonance-c4630-dab-1
retrieved_at: 2026-06-02T03:13:13.198Z
last_checked_at: 2026-09-21T22:17:38.566Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:17:38.566Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions match source command/query tables verbatim; transport parameters (19200 8N1 none) match line 226 exactly; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Keypad button macro programming via Sonance Control Manager software is out of scope for serial control."
- "no safety warnings or interlock procedures in refined source."
- "firmware version compatibility not stated in source."
- "no response timing/latency specs in source."
- "source covers C4630 SE only; DAB-1 coverage not present in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
